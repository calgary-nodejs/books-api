'use strict'

const { buildQuery, db, getById } = require('../lib/db')
const Promise = require('bluebird')

exports.getBookById = (id) => {
  return getById('book', id)
}

exports.getBooks = (params) => {
  return new Promise((resolve, reject) => {
    const dbQueryAllBooks = buildQuery('book')
    let dbQuery
    if (params && params.category) {
      dbQuery = buildQuery('category', params.category);
    }
    if (params && params.author) {
      dbQuery = buildQuery('author', params.author)
    }
    let result = []
    db.createValueStream(dbQuery || dbQueryAllBooks)
      .on('data', data => {
        result = result.concat(data)
      })
      .on('error', reject)
      .on('end', () => resolve(dbQuery
          ? Promise.all(result.map(exports.getBookById))
          : result))
  })
}
