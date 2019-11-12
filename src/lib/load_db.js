'use strict'

const data = require('../../data.json')

const { db } = require('./db')



const buildIndex = (objects, property) => {
  let keys = new Set()
  return {
    name: property,
    keys,
    map: objects.reduce((result, obj) => {
      const addToResult = item => {
        item = item.toLowerCase()
        keys.add(item)
        result[item] = result[item] || []
        result[item].push(obj.id)
      }
      obj[property].forEach(addToResult)
      return result
    }, {})
  }
}

const saveIndex = (index, prefix) => {
  index.keys.forEach(key => db.put(prefix + '\x00' + key, index.map[key]))
  db.put(index.name, [ ...index.keys ].sort())
}

exports.load = () => {
  data.users.forEach(user => {
    db.put(`user\x00${user.id}`, user)
    db.put(`userByEmail\x00${user.email}`, user.id)
  })
  data.books.forEach(book => db.put(`book\x00${book.id}`, book))
  saveIndex(buildIndex(data.books, 'authors'), 'author')
  saveIndex(buildIndex(data.books, 'categories'), 'category')
}
