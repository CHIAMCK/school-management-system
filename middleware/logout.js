'use strict'

module.exports = {
  logout
}

async function logout (ctx, next) {
  ctx.session = null
  ctx.status = 201
}
