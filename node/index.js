'use strict'

require('babel-register')({
	plugins: ['transform-async-to-generator']
})

const api = require('./app/.')

const porta = process.env.PORT || 3000

api.listen(porta, () => {
	console.log(`running on port ${porta}`)
})
