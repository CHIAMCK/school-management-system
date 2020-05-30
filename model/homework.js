const { Model } = require('objection')
const HomeworkAttachment = require('./homeworkAttachment')

class Homework extends Model {
  static get tableName () {
    return 'homework'
  }
}
module.exports = Homework
