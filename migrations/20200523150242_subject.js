
exports.up = function(knex, Promise) {
  return knex.schema.createTable('subject', (table) => {
    table.uuid('id').notNullable().primary()
    table.string('name').notNullable().unique()

    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('deleted_at').nullable()
    table.timestamp('updated_at').nullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('subject')
};
