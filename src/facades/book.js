'use strict'

let books = require('../../db.json')

function getBooks (query) {
  let result = books
  if (query.category) {
    result = result.filter(hasCategory(query.category))
  }
  if (query.author) {
    result = result.filter(hasAuthor(query.author))
  }
  return result
}

function hasCategory (category) {
  return book => book.categories
    .map(c => c.toLowerCase())
    .includes(category.toLowerCase())
}

function hasAuthor (author) {
  return book => book.authors
    .map(a => a.toLowerCase())
    .some(a => a.indexOf(author.toLowerCase()) !== -1)
}

function getBooksById (id) {
  return books.find(b => b.id === id)
}

exports.getBooks = getBooks
exports.getBooksById = getBooksById
