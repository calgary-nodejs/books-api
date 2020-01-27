'use strict'

const router = require('express').Router()
const authz = require('express-jwt-authz')
const { getBooks, getBookById } = require('../facades/book')
const {
  getBooksInspiredByUserViews,
  getSimilarBooks,
  updateBooksInspiredByUserViews
} = require('../facades/recommendation')
const { optionalAuthentication } = require('./middleware/authentication')

router.get('/', (req, res) => {
  getBooks(req.query)
    .then(books => res.send(books))
    .catch(err => res.status(500).end())
})

router.get('/inspired', (req, res) => {
  getBooksInspiredByUserViews(req.user)
    .then(books => res.send(books))
    .catch(err => res.status(500).end())
})

router.param('bookId', (req, res, next, bookId) => {
  if (req.method === 'DELETE') { return next() }

  getBookById(bookId)
    .then(book => {
      req.book = book
      next()
    })
    .catch(err => res.status(404).send({ message: "Not Found" }))
})

router.get('/:bookId', optionalAuthentication, async (req, res) => {
  if (req.user) {
    await updateBooksInspiredByUserViews(req.book, req.user)
  }
  res.send(req.book)
})

router.get('/:bookId/similar', (req, res) => {
  getSimilarBooks(req.book)
    .then(similarBooks => res.send(similarBooks))
    .catch(err => res.status(500).end())
})

router.delete(
  '/:bookId',
  authz([ 'delete:book' ]),
  (req, res) => {
    res.sendStatus(204)
  }
)

module.exports = router
