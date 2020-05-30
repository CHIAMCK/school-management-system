'use strict'

const HomeworkAttachment = require('../model/homeworkAttachment')
const Homework = require('../model/homework')
const uuid = require('uuid/v4')
const fs = require('fs');


module.exports = {
  createHomework,
  listHomework
}

async function listHomework(ctx, next) {
  const homework = await Homework.query().select('id', 'title', 'description', 'due_date')
  ctx.body = {
    homework_list: homework
  }
}

async function createHomework(ctx, next) {
  const { title, description, subjectId, classId, dueDate, teacherId } = ctx.req.fields
  const attachments = ctx.req.files.attachments

  let homework
  try {
    homework = await Homework.query().insert({
        id: uuid(),
        title: title,
        description: description,
        subject_id: subjectId,
        class_id: classId,
        due_date: dueDate ? dueDate: null,
        created_by: teacherId
    })

    // save all the attachments
    attachments.map(async attachment => {
      await HomeworkAttachment.query().insert({
        id: uuid(),
        homework_id: homework.id,
        path: attachment.path
      })
    })
  } catch (e) {
    return ctx.throw(500, e)
  }
  ctx.body = homework
  ctx.status = 201
  await next()
}

// valiate payload
async function validate (ctx, next) {
  const payload = ctx.request.body
  ctx.assert(payload && payload.name, 401, 'Unauthorized')
  ctx.state = payload
  await next()
}
