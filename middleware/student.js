'use strict'

const Student = require('../model/student')

module.exports = {
  validate,
  listStudent
}

async function listStudent(ctx, next) {
  const students = await Student.query().select('id', 'name')
  ctx.body = {
    student_list: students
  }
}

async function deleteStudent(ctx, next) {

}

// valiate payload
async function validate (ctx, next) {
  const payload = ctx.request.body
  ctx.assert(payload && payload.name, 401, 'Unauthorized')
  ctx.state = payload
  await next()
}
