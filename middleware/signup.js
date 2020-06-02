'use strict'

const Account = require('../model/account')
const Student = require('../model/student')
const uuid = require('uuid/v4')

module.exports = {
  signup,
  validate
}

async function signup (ctx, next) {
  const { name, email, classId, password, role } = ctx.state
  // throw error if there is duplicate email (with unique constraint defined in model)
  try {
    const account = await Account.query().insert({
      id: uuid(),
      email: email,
      password: password,
      role: role
    })

    // if user is student
    if(role == 'student') {
      await Student.query().insert({
        id: uuid(),
        name: name,
        school_class_id: classId,
        account_id: account.id
      })
    } else if (role == 'teacher') {
      // if user is teacher
    }
  } catch (e) {
    console.log(e)
    if (e.constraint.match(/unique$/)) {
      // throw error
      return ctx.throw(400, 'Account already exists')
    }
    return ctx.throw(500, e)
  }

  ctx.status = 201
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
