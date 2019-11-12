'use strict'

const level = require('level')
const Promise = require('bluebird')

const db = level('./db', { valueEncoding: 'json' })
Promise.promisifyAll(db)
exports.db = db

exports.buildQuery = (index, key) => {
  const keyLowerCased = key ? key.toLowerCase() : ''
  const searchFor = `${index}\x00${keyLowerCased}`
  return { gte: searchFor, lt: `${searchFor}\xff` }
}

exports.getById = (index, id) => {
  const key = id ? `\x00${id}` : ''
  return db.getAsync(`${index}${key}`)
}
