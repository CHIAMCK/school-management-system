const { Model } = require('objection')

class HomeworkAttachment extends Model {
  static get tableName () {
    return 'homework_attachment'
  }
}
module.exports = HomeworkAttachment
