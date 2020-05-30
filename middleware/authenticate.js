'use strict'

const http = require('http')

module.exports = {
  authenticated
}

async function authenticated (ctx, next) {
  ctx.assert(ctx.session && ctx.session.account, 403, http.STATUS_CODES[403])
}
