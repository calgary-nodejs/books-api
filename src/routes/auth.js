'use strict'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { getUserByEmail } = require('../facades/user')

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
    const { id, name, scope } = user
    const accessToken = jwt.sign({
      id,
      email,
      name,
      scope
    }, 'SOMESECRET', { expiresIn: 3000 })
    res.json({
      'access_token': accessToken
    })
  } catch (e) {
    res.sendStatus(500)
  }
})

module.exports = router
