'use strict'

let express = require('express')
let { getAuthors } = require('./facades/author')
let { getBooks, getBooksById } = require('./facades/book')

let app = express()

app.get('/authors', (req, res) => {
  res.send(getAuthors())
})

app.get('/books', (req, res) => {
  res.send(getBooks(req.query))
})

app.get('/books/:bookId', (req, res) => {
  let book = getBooksById(req.params.bookId)
  if (book) {
    res.send(book)
  } else {
    res.status(404).send({ message: "Not Found" })
  }
})

app.listen(3000, 'localhost')
