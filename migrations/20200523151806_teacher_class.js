
exports.up = function(knex, Promise) {
  return knex.schema.createTable('teacher_class', (table) => {
    table.uuid('id').notNullable().primary()
    table.uuid('teacher_id')
    table.uuid('class_id')

    table.foreign('teacher_id').references('teacher.id')
    table.foreign('class_id').references('school_class.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('teacher_class')
};
