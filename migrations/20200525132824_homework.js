
exports.up = function(knex, Promise) {
  return knex.schema.createTable('homework', (table) => {
    table.uuid('id').notNullable().primary()
    table.string('title').notNullable()
    table.text('description')
    table.uuid('subject_id').notNullable()
    table.uuid('class_id').notNullable()
    table.timestamp('due_date')
    table.uuid('created_by').notNullable()

    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('deleted_at').nullable()
    table.timestamp('updated_at').nullable()

    table.foreign('subject_id').references('subject.id')
    table.foreign('class_id').references('school_class.id')
    table.foreign('created_by').references('teacher.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('homework')
};
