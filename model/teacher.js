const { Model } = require('objection')
const TeacherClass = require('./teacherClass')
const TeacherSubject = require('./teacherSubject')

class Teacher extends Model {
  static get tableName () {
    return 'teacher'
  }

  static get relationMappings () {
    return {
      subject: {
        relation: Model.HasManyRelation,
        modelClass: TeacherSubject,
        join: {
          from: 'teacher.id',
          to: 'teacher_subject.teacher_id'
        }
      },
      schoolClass: {
        relation: Model.HasManyRelation,
        modelClass: TeacherClass,
        join: {
          from: 'teacher.id',
          to: 'teacher_class.teacher_id'
        }
      }
    }
  }
}
module.exports = Teacher
