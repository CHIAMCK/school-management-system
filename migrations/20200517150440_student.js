
exports.up = function(knex, Promise) {
  return knex.schema.createTable('student', (table) => {
    table.uuid('id').notNullable().primary()
    table.string('name').notNullable()
    table.uuid('account_id')
    table.uuid('school_class_id')

    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('deleted_at').nullable()
    table.timestamp('updated_at').nullable()

    table.foreign('account_id').references('account.id')
    table.foreign('school_class_id').references('school_class.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('student')
};
