'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')
const accounts = require('../seeds/accounts.json')

chai.use(chaiHttp)
chai.should()

const account = accounts.shift()

describe('#auth', () => {
  let server = null
  beforeEach(() => {
    const app = require('../')
    server = chai.request(app)
  })

  // it('should throw 401 error when email and password is not passed', () => {
  //   return server
  //     .post('/login')
  //     .send()
  //     .then(res => {
  //       res.status.should.eql(401)
  //     })
  // })

  // it('should return 401 when wrong email and password is passed', () => {
  //   return server
  //     .post('/v1/login')
  //     .send({
  //       email: faker.internet.email(),
  //       password: faker.internet.password(),
  //       role: 'student'
  //     })
  //     .then(res => {
  //       res.status.should.eql(401)
  //     })
  // })

  it('should be able to login', () => {
    return server
      .post('/v1/login')
      .send({
        email: account.email,
        password: account.password,
        role: 'student'
      })
      .then(res => {
        res.status.should.eql(201)
      })
  })
})
