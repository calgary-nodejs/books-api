'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const { load } = require('./lib/load_db')

load()

const app = express()

app
  .use(bodyParser.json())
  .use('/auth', require('./routes/auth'))
  .use(require('./routes/middleware/authentication'))
  .use('/authors', require('./routes/authors'))
  .use('/books', require('./routes/books'))

app.listen(3000, 'localhost')
