'use strict'

let levelup = require('levelup')

module.exports = levelup('db', { valueEncoding: 'json' })
