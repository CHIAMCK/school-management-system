// const redis = require('thunk-redis')
// const nconf = require('nconf')

// const account = require('../fixtures/account.json')

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
//   console.log('seeting session abc')
//   console.log(account)
//   return client.setex('8304cd69-1288-428b-ae9a-15ae190bdfd6', 86410, JSON.stringify({
//     account,
//     _expire: date.getTime(),
//     _maxAge: 86400000
//   }))
// })
