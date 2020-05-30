const { Model } = require('objection')

class TeacherSubject extends Model {
  static get tableName () {
    return 'teacher_subject'
  }
}
module.exports = TeacherSubject
