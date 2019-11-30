'use strict'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { getUserByEmail } = require('../facades/user')
const { getRefreshToken, putRefreshToken } = require('../facades/refreshToken')

router.post('/', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).json({
      message: 'Provide email & password'
    })
    return
  }
  try {
    const user = await getUserByEmail(email)
    if (!user) {
      res.sendStatus(401)
      return
    }
    const passwordMatch = await bcrypt.compare(password, user.secret)
    if (!passwordMatch) {
      res.sendStatus(401)
      return
    }

    res.json(await _generateAuthorizationForUser(user, true))
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
})

router.post('/token', async (req, res) => {
  const { email } = req.body
  const refreshToken = req.body.refresh_token
  if (!email || !refreshToken) {
    res.status(400).json({
      message: 'Provide email & token'
    })
    return
  }
  try {
    const user = await getUserByEmail(email)
    if (!user) {
      res.sendStatus(401)
      return
    }
    const storedToken = await getRefreshToken(user.id)
    if (!storedToken) {
      res.sendStatus(401)
      return
    }
    if (storedToken.token !== refreshToken) {
      res.sendStatus(401)
      return
    }
    res.json(await _generateAuthorizationForUser(user))
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
})

const _generateTokenForUser = (user) => {
  const { id, name, email, scope } = user
  return jwt.sign({
    id,
    email,
    name,
    scope
  }, 'SOMESECRET', { expiresIn: 3000 })
}

const _generateAuthorizationForUser = async (user, includeToken = false) => {
  const accessToken = _generateTokenForUser(user)
  const auth = {
    'access_token': accessToken
  }

  if (includeToken) {
    const token = putRefreshToken(user.id)
    auth['refresh_token'] = token
  }
  
  return auth
}

module.exports = router
