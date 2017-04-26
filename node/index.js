'use strict'

const crypto = require('crypto')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')

const porta = process.env.PORT || 3000

const koa = new Koa()
const router = new Router()

function verifySignature(ctx, next) {
	const signature = ctx.request.headers['x-teleport-signature']
	const payload = JSON.stringify(ctx.request.body)
	const verify = `sha1=${crypto.createHmac('sha1', 'segredo').update(payload).digest('hex')}`
	if (verify === signature) {
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

router.post('/payload', payload)
router.post('/payload-secure', verifySignature, payload)

koa
	.use(bodyParser())
	.use(router.routes())
	.use(router.allowedMethods({throw: true}))

koa.listen(porta, () => {
	console.log(`running... port ${porta}`)
})
