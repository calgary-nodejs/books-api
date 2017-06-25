'use strict'

let router = require('express').Router()
let { getBooks, getBookById } = require('../facades/book')

router.get('/', (req, res) => {
  getBooks(req.query, (err, books) => {
    if (err) {
      return res.status(500).end()
    }
    res.send(books)
  })
})

router.get('/:bookId', (req, res) => {
  getBookById(req.params.bookId, (err, book) => {
    if (err) {
      return res.status(404).send({ message: "Not Found" })
    }
    res.send(book)
  })
})

module.exports = router
