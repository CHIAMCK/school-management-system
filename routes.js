'use strict'

const login = require('./middleware/login')
const logout = require('./middleware/logout')
const signup = require('./middleware/signup')

module.exports = (router) => {
  router.post('/login', login.validate, login.login)
  router.post('/logout', logout.logout)
  router.get('/list', login.list)
  router.post('/signup', signup.validate, signup.signup)
}
