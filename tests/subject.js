'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')
const account = require('./fixtures/account.json')

chai.use(chaiHttp)
chai.should()

// const account = accounts.shift()

// let COOKIE = 'api=8304cd69-1288-428b-ae9a-15ae190bdfd6; api.sig=LPNQohUsBv5g4uH18weZOJV_Z7Y;'
let COOKIE

describe('#auth', () => {
  let server = null

  beforeEach(async () => {
    const app = require('../')
    server = chai.request(app)

    // console.log(account)
  })

  it('log in first', () => {
    return server
      .post('/v1/login')
      .send({
        email: account.email,
        password: account.password,
        role: 'student'
      })
      .then(res => {
        res.status.should.eql(200)
        let session
        let sessionSignature
        session = res.headers['set-cookie'][0]
                    .split(',')
                    .map(item => item.split(';')[0])
                    .join(';')
        sessionSignature = res.headers['set-cookie'][1].split(',')
              .map(item => item.split(';')[0])
              .join(';')
        COOKIE = session + ';' + sessionSignature
      })
  })

  it('should return 200 and create a new subject', () => {
    return server
      .post('/v1/subject')
      .set('cookie', COOKIE)
      .send({
        name: 'Math'
      })
      .then(res => {
        console.log('finish')
        res.status.should.eql(201)
      })
  })
})
