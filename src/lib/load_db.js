'use strict'

let books = require('../../db.json')

let db = require('./db')

function buildIndex (objects, property) {
  let keys = new Set()
  return {
    name: property,
    keys,
    map: objects.reduce((result, obj) => {
      obj[property].forEach(item => {
        item = item.toLowerCase()
        keys.add(item)
        result[item] = result[item] || []
        result[item].push(obj.id)
      })
      return result
    }, {})
  }
}

function saveIndex (index, prefix) {
  index.keys.forEach(key => db.put(prefix + '\x00' + key, index.map[key]))
  db.put(index.name, [ ...index.keys ].sort())
}

function load () {
  books.forEach(book => db.put(book.id, book))
  saveIndex(buildIndex(books, 'authors'), 'author')
  saveIndex(buildIndex(books, 'categories'), 'category')
}

module.exports = load
