const bcrypt = require('bcrypt')
const { Model } = require('objection')

const saltRounds = 10

class Account extends Model {
  static get tableName () {
    return 'account'
  }

  // compare password in request with model password
  // instance method
  comparePassword (current) {
    return bcrypt.compare(current, this.password)
  }

  static _generatePassword (current) {
    return bcrypt.hash(current, saltRounds)
  }
}
module.exports = Account
