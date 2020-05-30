
exports.up = function(knex, Promise) {
  return knex.schema.createTable('teacher_subject', (table) => {
    table.uuid('id').notNullable().primary()
    table.uuid('teacher_id')
    table.uuid('subject_id')

    table.foreign('teacher_id').references('teacher.id')
    table.foreign('subject_id').references('subject.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('teacher_subject')
};
