
exports.up = function(knex, Promise) {
  return knex.schema.createTable('homework_attachment', (table) => {
    table.uuid('id').notNullable().primary()
    table.uuid('homework_id').notNullable()
    table.timestamp('uploaded_at').default(knex.fn.now())
    table.string('path').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('homework_attachment')
};
