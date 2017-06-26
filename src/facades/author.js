'use strict'

let { getBooks } = require('./book')

function getAuthors() {
    return getBooks()
            .filter(book => book.authors) //remove books without authors
            .map(book => book.authors) //we only care about authors
            .reduce((prev, curr) => prev.concat(curr)) //flatten list of lists
            .then(authors => authors.sort()) //sort alaphabetically (by first name)
}

exports.getAuthors = getAuthors
