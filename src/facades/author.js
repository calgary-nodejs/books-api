'use strict'

let books = require('../../db.json')

function getAuthors () {
  let result = new Set(
    books
      .map(book => book.authors)
      .reduce((prev, curr) => prev.concat(curr))
      .sort()
    )
  return [...result]
}

exports.getAuthors = getAuthors
