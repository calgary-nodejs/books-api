'use strict'

const jwt = require('express-jwt')

exports.authentication = jwt({
  secret: 'SOMESECRET',
  credentialsRequired: true
}).unless({
  path: [
    { url: /^\/books+(?!\/inspired$)/, methods: [ 'GET' ] }
  ]
})

exports.optionalAuthentication = jwt({
  secret: 'SOMESECRET',
  credentialsRequired: false,
})
