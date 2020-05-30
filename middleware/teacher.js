'use strict'

const Student = require('../model/student')
const Teacher = require('../model/teacher')
const uuid = require('uuid/v4')

module.exports = {
  validate,
  createTeacher,
  listTeacher
}

async function createTeacher(ctx, next) {
  const { name, classId, subjectId } = ctx.request.body
  try {
    const teacher = await Teacher.query().insertGraph({
      id: uuid(),
      name: name,
      subject: [
        {
          id: uuid(),
          subject_id: subjectId
        }
      ],
      schoolClass: [
        {
          id: uuid(),
          class_id: classId
        }
      ]
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

async function listTeacher(ctx, next) {
  const teachers = await Teacher.query().select('id', 'name')
  ctx.body = {
    teacher_list: teachers
  }
}

// valiate payload
async function validate (ctx, next) {
  const payload = ctx.request.body
  ctx.assert(payload && payload.name, 401, 'Unauthorized')
  ctx.state = payload
  await next()
}
