
const Koa = require('koa')
var bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const nconf = require('nconf')
const session = require('koa-session')
var redisStore = require('koa-redis');

nconf
  .argv()
  .env()

const app = new Koa();
const router = new Router();

const routes = require('./routes')

routes(router)

app.use(bodyParser())

// session setting
app.use(session({
  key: nconf.get('SESSION_KEY'),
  store: redisStore({
    host: nconf.get('REDIS_HOST'),
    port: nconf.get('REDIS_PORT')
  })
}, app))

// routes setting
app
  .use(router.routes())
  .use(router.allowedMethods())

// port setting
const port = nconf.get('PORT')
const server = app.listen(port)
console.log(`server running at port ${port}`)

module.exports = server
