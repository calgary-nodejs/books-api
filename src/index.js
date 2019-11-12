'use strict'

const express = require('express')
const { load } = require('./lib/load_db')

load()

const app = express()

app.use('/authors', require('./routes/authors'))
app.use('/books', require('./routes/books'))

app.listen(3000, 'localhost')
