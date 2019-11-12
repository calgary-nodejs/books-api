'use strict'

const { getById } = require('../lib/db')

/**
 * Will return all authors.
 * Accepts one url param: name
 * Matching is case sensitive and uses a startswith comparison
 * @param params
 */
exports.getAuthors = (params) => {
  const allAuthors = getById('authors')
  if (params && params.name) {
    return allAuthors.filter(author => author.includes(params.name))
  }
  return allAuthors
}
