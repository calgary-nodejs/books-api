'use strict'

let router = require('express').Router()
let { getBooks, getBookById } = require('../facades/book')

router.get('/', (req, res) => {
  getBooks(req.query)
    .then(books => res.send(books))
    .catch(err => res.status(500).end())
})

router.get('/:bookId', (req, res) => {
  getBookById(req.params.bookId)
    .then(book => res.send(book))
    .catch(err => res.status(404).send({ message: "Not Found" }))
})

module.exports = router
