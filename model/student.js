const { Model } = require('objection')
const Account = require('./account')
const SchoolClass = require('./schoolClass')

class Student extends Model {
  static get tableName () {
    return 'student'
  }

  static get relationMappings () {
    return {
      account: {
        relation: Model.HasOneRelation,
        modelClass: Account,
        join: {
          from: 'student.id',
          to: 'account.id'
        }
      },
      schoolClass: {
        relation: Model.BelongsToOneRelation,
        modelClass: SchoolClass,
        join: {
          from: 'student.id',
          to: 'school_class.id'
        }
      }
    }
  }
}
module.exports = Student
