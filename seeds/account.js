const Account = require('../model/account')
const accounts = [
  {
    'id': '51195ffe-7d5d-4df1-a381-b65b6a07e6a4',
    'email': 'tester@gmail.com',
    'password': '123123'
  }
]

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  await knex('account').del()

  for (let account of accounts) {
    const password = await Account._generatePassword(account.password)
    account.password = password
  }
  // Inserts seed entries
  await knex('account').insert(accounts)
}
