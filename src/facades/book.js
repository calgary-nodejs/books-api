'use strict'

let db = require('../lib/db')
let Promise = require('bluebird')

function getBooks (query) {
  return new Promise((resolve, reject) => {
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
      .on('error', reject)
      .on('end', () => resolve(dbQuery
          ? Promise.all(result.map(getBookById))
          : result))
  })
}

function getBookById (id) {
  return db.getAsync(id)
}

exports.getBooks = getBooks
exports.getBookById = getBookById
