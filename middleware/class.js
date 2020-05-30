'use strict'

const Class = require('../model/schoolClass')
const uuid = require('uuid/v4')

module.exports = {
  createClass,
  listClass,
  validate
}

async function createClass(ctx, next) {
  const { name } = ctx.state
  try {
    await Class.query().insert({ id: uuid(), name: name})
  } catch(e) {
    if (e.constraint.match(/unique$/)) {
      return ctx.throw(400, 'Class already exists')
    }
    return ctx.throw(500, e)
  }

  ctx.status = 201
  await next()
}

async function listClass(ctx, next) {
  const classes = await Class.query()
  ctx.body = {
    class_list: classes,
  }
  ctx.status = 200
}

// valiate payload
async function validate (ctx, next) {
  const payload = ctx.request.body
  ctx.assert(payload && payload.name, 401, 'Unauthorized')
  ctx.state = payload
  await next()
}
