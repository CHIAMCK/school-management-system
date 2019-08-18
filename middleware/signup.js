'use strict'

const Account = require('../model/account')
const uuid = require('uuid/v4')

module.exports = {
  signup,
  validate
}

async function signup (ctx, next) {
  const { email, password } = ctx.state
  // throw error if there is duplicate email (with unique constraint defined in model)
  try {
    await Account.query().insert({ id: uuid(), email: email, password: password })
  } catch (e) {
    if (e.constraint.match(/unique$/)) {
      // throw error
      return ctx.throw(400, 'Account already exists')
    }
    return ctx.throw(500, e)
  }

  ctx.status= 201
  await next()
}

async function validate(ctx, next) {
  // the parsed body will be stored in ctx.request.body
  const payload = ctx.request.body
  ctx.assert(payload, payload.email && payload.passoword, 400, 'Bad request')
  // pass payload to next middleware
  ctx.state = payload
  await next()
}
