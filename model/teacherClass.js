const { Model } = require('objection')

class TeacherClass extends Model {
  static get tableName () {
    return 'teacher_class'
  }
}
module.exports = TeacherClass
