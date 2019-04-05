exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', function(tableColumn) {
    tableColumn.increments();

    tableColumn
      .string('name')
      .unique('uq_project_name')
      .notNullable();

    tableColumn.text('description');

    tableColumn
      .boolean('completed')
      .defaultTo(false)
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('projects');
};
