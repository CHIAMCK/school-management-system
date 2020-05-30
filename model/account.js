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

  async $beforeInsert () {
    const hashed = await bcrypt.hash(this.password, saltRounds)
    this.password = hashed
  }

  async $beforeUpdate () {
    if (this.password) {
      const hashed = await bcrypt.hash(this.password, saltRounds)
      this.password = hashed
    }
  }
}
module.exports = Account
