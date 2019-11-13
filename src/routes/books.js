'use strict'

const router = require('express').Router()
const authz = require('express-jwt-authz')
const { getBooks, getBookById } = require('../facades/book')

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

router.delete(
  '/:bookId',
  authz([ 'delete:book' ]),
  (req, res) => {
    res.sendStatus(204)
  }
)

module.exports = router
