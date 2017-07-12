'use strict'

let db = require('../lib/db')
let Promise = require('bluebird')

/**
 * Will return all authors.
 * Accepts one url param: name
 * Matching is case sensitive and uses a startswith comparison
 * @param query
 */
function getAuthors(query) {
    return new Promise((resolve, reject) => {
        let result = []
        let dbQuery
        let key = 'author\x00' + (query && query.name ? query.name : '')
        dbQuery = {'gte': key, 'lt': key + '\xff'}
        db.createReadStream(dbQuery)
            .on('data', data => {
                result = result.concat(data.key.replace('author\x00', ''))
            })
            .on('error', reject)
            .on('end', () => resolve(result))
    })
}


exports.getAuthors = getAuthors
