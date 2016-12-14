'use strict'

const http = require('http')
const WebSocket = require('ws')
const cors = require('kcors')
const bodyParser = require('koa-bodyparser')
const Koa = require('koa')
const routing = require('./routes')

const env = process.env.NODE_ENV || 'dev'
const porta = process.env.PORT || 3000
const WebSocketServer = WebSocket.Server

const app = new Koa()
const server= http.createServer(app.callback())
const wss = new WebSocketServer({server})

app
	.use(cors())
	.use(bodyParser())

routing(app, wss)

module.exports = server
