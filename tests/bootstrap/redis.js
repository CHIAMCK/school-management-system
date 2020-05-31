// const redis = require('thunk-redis')
// const nconf = require('nconf')

// const account = require('../../seeds/accounts.json')

// nconf
//   .env()

// const client = redis.createClient({
//   host: nconf.get('REDIS_HOST'),
//   port: nconf.get('REDIS_PORT'),
//   usePromise: true
// })

// before(() => {
//   const date = new Date()
//   date.setDate(date.getDate() + 1)

//   return client.setex('1524463698299-YWdw1ufWCFmrN2LtO7ozBG1Cf_x5eK5D', 86410, JSON.stringify({
//     account,
//     _expire: date.getTime(),
//     _maxAge: 86400000
//   }))
// })
