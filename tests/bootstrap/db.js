const nconf = require('nconf')
const Knex = require('knex')

nconf
  .env()

const knexConfig = require('../../knexfile')
const DATABASE_NAME = 'db-tester'

const knex = Knex(knexConfig.development)

// create database
before(async () => {
  process.env.DATABASE_NAME = DATABASE_NAME

  await knex.raw(`create database "${DATABASE_NAME}";`)

  knexConfig.development.connection.database = DATABASE_NAME

  const testKnex = Knex(knexConfig.development)
  await testKnex.migrate.latest()
  await testKnex.seed.run()

  await new Promise(resolve => {
    testKnex.destroy(() => {
      knex.raw(`drop database "${DATABASE_NAME}";`)
      resolve()
    })
  })
})

// delete db after is done
after(async () => {
  // knex.raw(`SELECT pg_terminate_backend (pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = 'db-tester';`)

  // cannot drop the db, error message: it is being accessed by other users
  return knex.raw(`drop database "${DATABASE_NAME}";`)
})
