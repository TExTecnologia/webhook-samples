'use strict'

const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

const router = new Router()
const html = fs.readFileSync(path.join(__dirname, '..', '..', 'public', 'index.html'), 'utf8')

function broadcast(data, wss) {
	wss.clients.forEach(client => {
		client.send(data)
	})
}

function routing(app, wss) {
	router.get('/', async (ctx, next) => {
		ctx.body = html
	})

	router.post('/payload', async (ctx, next) => {
		const d = ctx.request.body
		broadcast(`${JSON.stringify(ctx.request.headers)}\n${JSON.stringify(d)}`, wss)
		ctx.body = ''
	})

	app
		.use(router.routes())
		.use(router.allowedMethods({
			throw: true
		}))
}

module.exports = routing
