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
    // open the server for incoming requests
    // once a request has been made the server will automatically shut down
    server = chai.request(app)
  })

  it('should throw 401 error when email and password is not passed', () => {
    return server
      .post('/v1/login')
      .send()
      .then(res => {
        res.status.should.eql(401)
      })
  })

  it('should return 401 when wrong email and password is passed', () => {
    return server
      .post('/v1/login')
      .send({
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'student'
      })
      .then(res => {
        res.status.should.eql(401)
      })
  })

  it('should be able to login', () => {
    return server
      .post('/v1/login')
      .send({
        email: account.email,
        password: account.password,
        role: 'student'
      })
      .then(res => {
        res.status.should.eql(200)
      })
  })

  it('should return 401 if password is not passed', () => {
    return server
      .post('/v1/login')
      .send({
        email: account.email,
        password: null,
        role: 'student'
      })
      .then(res => {
        res.status.should.eql(401)
      })
  })

  it('should be able to logout', () => {
    return server
      .post('/v1/logout')
      .send()
      .then(res => {
        res.status.should.eql(201)
      })
  })
})
