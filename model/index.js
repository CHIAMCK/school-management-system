// to use objection js, installs the knex instance globally for all models

'use strict'

const { Model } = require('objection')
const Knex = require('knex')
const nconf = require('nconf')

nconf.env()

// Initialize knex.
const knex = Knex({
  client: nconf.get('DATABASE_CLIENT'),
  connection: {
    host: nconf.get('DATABASE_HOST') || '127.0.0.1',
    database: nconf.get('DATABASE_NAME'),
    user: nconf.get('DATABASE_USERNAME'),
    password: nconf.get('DATABASE_PASSWORD')
  },
  pool: {
    min: 2,
    max: 10
  }
})

// Give the knex object to objection.
Model.knex(knex)

module.exports = knex
