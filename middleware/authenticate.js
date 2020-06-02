'use strict'

const http = require('http')

module.exports = {
  authenticated
}

async function authenticated (ctx, next) {
  console.log(ctx.session)
  ctx.assert(ctx.session && ctx.session.account, 403, http.STATUS_CODES[403])
  await next()
}
