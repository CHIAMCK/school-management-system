// Update with your config settings.
const nconf = require('nconf')

module.exports = {

  development: {
    client: nconf.get('DATABASE_CLIENT'),
    connection: {
      host : nconf.get('DATABASE_HOST') || '127.0.0.1',
      database: nconf.get('DATABASE_NAME'),
      user: nconf.get('DATABASE_USERNAME'),
      password: nconf.get('DATABASE_PASSWORD')
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: nconf.get('DATABASE_CLIENT'),
    connection: {
      database: nconf.get('DATABASE_NAME'),
      user: nconf.get('DATABASE_USERNAME'),
      password: nconf.get('DATABASE_PASSWORD')
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
