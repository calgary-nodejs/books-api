'use strict'

let express = require('express')
let loadDB = require('./lib/load_db')()

let app = express()

app.use('/authors', require('./routes/authors'))
app.use('/books', require('./routes/books'))

app.listen(3000, 'localhost')
