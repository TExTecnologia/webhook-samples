'use strict'

const base = require('koa-app-base')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const {verify} = require('@tadashi/signature')

const porta = process.env.PORT || 3000
const router = new Router()

function verifySignature(ctx, next) {
	if (verify(ctx.request.headers['x-teleport-signature'], JSON.stringify(ctx.request.body), 'segredo')) {
		return next()
	}
	ctx.throw(401)
}

function payload(ctx) {
	ctx.body = {
		success: true,
		data: ctx.request.body
	}
}

router.post('/payload', bodyParser(), payload)
router.post('/payload-secure', bodyParser(), verifySignature, payload)

const app = base({error: true})
	.use(router.routes())
	.use(router.allowedMethods({throw: true}))
	.on('error', console.error)

app.proxy = true
app.listen(porta)
