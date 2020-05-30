
exports.up = function(knex, Promise) {
  return knex.schema.createTable('school_class', (table) => {
    table.uuid('id').notNullable().primary()
    table.string('name').notNullable().unique()
    table.enu('status', ['Active', 'Inactive']).defaultTo('Active')

    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('deleted_at').nullable()
    table.timestamp('updated_at').nullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('school_class')
};
