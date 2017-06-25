'use strict'

let db = require('../lib/db')

function getBooks (query, cb) {
  let result = []
  let dbQuery
  if (query.category) {
    let key = 'category\x00' + query.category.toLowerCase()
    dbQuery = { 'gte': key, 'lt': key + '\xff' }
  }
  db.createReadStream(dbQuery)
    .on('data', data => {
      result = result.concat(data.value)
    })
    .on('error', cb)
    .on('end', () => dbQuery
        ? getBooksByIds(result, cb)
        : cb(null, result))
}

function getBooksByIds (ids, cb) {
  if (!ids.length) {
    return cb(null, [])
  }
  getBookById(ids[0], (err, book) => {
    getBooksByIds(ids.slice(1), (err, books) => {
      books.push(book)
      cb(null, books)
    })
  })
}

function getBookById (id, cb) {
  db.get(id, cb)
}

exports.getBooks = getBooks
exports.getBookById = getBookById
