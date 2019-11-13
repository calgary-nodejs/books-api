'use strict'

const jwt = require('express-jwt')

module.exports = jwt({
  secret: 'SOMESECRET',
  credentialsRequired: true
}).unless({
  path: [
    { url: /^\/books+/, methods: [ 'GET' ] }
  ]
})
