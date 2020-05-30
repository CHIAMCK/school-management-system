
exports.up = function(knex, Promise) {
  return knex.schema.createTable('teacher', (table) => {
    table.uuid('id').notNullable().primary()
    table.string('name').notNullable()

    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('deleted_at').nullable()
    table.timestamp('updated_at').nullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('teacher')
};
