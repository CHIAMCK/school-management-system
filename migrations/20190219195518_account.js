
exports.up = function (knex, Promise) {
  return knex.schema.createTable('account', (table) => {
    table.uuid('id').notNullable().primary()
    table.string('email').notNullable().unique()
    table.string('password').notNullable()

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('deleted_at').nullable()
    table.timestamp('updated_at').nullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('account')
}
