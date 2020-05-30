'use strict'

const Student = require('../model/student')
const Subject = require('../model/subject')
const uuid = require('uuid/v4')

module.exports = {
  validate,
  createSubject,
  listSubject
}

async function createSubject(ctx, next) {
  const { name } = ctx.request.body
  try {
    const subject = await Subject.query().insert({
      id: uuid(),
      name: name
    })
  } catch (e) {
    if (e.constraint.match(/unique$/)) {
      return ctx.throw(400, 'Subject already exists')
    }
    return ctx.throw(500, e)
  }
  ctx.status = 201
  await next()
}

async function listSubject(ctx, next) {
  const subjects = await Subject.query()
  ctx.body = {
    subject_list: subjects,
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
