'use strict'

let levelup = require('levelup')
let Promise = require('bluebird')

let db = levelup('db', { valueEncoding: 'json' })
Promise.promisifyAll(db)

module.exports = db
