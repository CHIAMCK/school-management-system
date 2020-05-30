const { Model } = require('objection')

class schoolClass extends Model {
  static get tableName () {
    return 'school_class'
  }
}
module.exports = schoolClass
