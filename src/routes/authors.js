'use strict'

let router = require('express').Router()
let { getAuthors } = require('../facades/author')

router.get('/', (req, res) => {
  res.send(getAuthors())
})

module.exports = router
