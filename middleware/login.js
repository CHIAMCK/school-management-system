'use strict'

const Account = require('../model/account')

module.exports = {
  login,
  validate
}

async function login (ctx, next) {
  const {email, password} = ctx.state

  const accounts = await Account.query()
    .where('email', email)
    .whereNull('deleted_at')
    .limit(1)

  ctx.assert(accounts.length === 1, 401, 'Unauthorized ')

  // compare password
  const account = accounts.shift()
  const correct = await account.comparePassword(password)
  ctx.assert(correct === true, 401, 'Unauthorized')

  delete account.password

  ctx.session.account = account

  ctx.status = 201
}

// valiate login payload
async function validate(ctx, next) {
  const payload = ctx.request.body
  ctx.assert(payload && payload.email && payload.password, 401, 'Unauthorized')
  ctx.state = payload
  await next()
}


