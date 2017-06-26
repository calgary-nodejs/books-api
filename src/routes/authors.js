'use strict'

let router = require('express').Router()
let { getAuthors } = require('../facades/author')

router.get('/', (req, res) => {
    getAuthors()
        .then(authors => res.send(authors))
        .catch(err => res.status(500).end())
})

module.exports = router
