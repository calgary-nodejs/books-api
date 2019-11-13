'use strict'

const { getById } = require('../lib/db')

exports.getUserByEmail = (email) =>
  getById('userByEmail', email)
    .then(id => getById('user', id))
