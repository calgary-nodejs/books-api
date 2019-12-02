'use strict'

const { getById, db } = require('../lib/db')
const uuid = require('uuid/v4')

const REFESH_TOKEN_KEY_PREFIX = 'refreshTokenByUserId'

/**
 * Will return a refreshToken by email.
 * Accepts one url param: email
 * Matching is case sensitive and uses a startswith comparison
 * @param params
 */
exports.getRefreshToken = async (userId) => {
  return await getById(REFESH_TOKEN_KEY_PREFIX, userId)
}

exports.putRefreshToken = (userId) => {
  const token = uuid()
  const refresh_token = { userId, token }
  db.put(`${REFESH_TOKEN_KEY_PREFIX}\x00${userId}`, refresh_token)
  return token
}