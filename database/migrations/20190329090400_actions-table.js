exports.up = function(knex, Promise) {
  return knex.schema.createTable('actions', function(tableColumn) {
    tableColumn.increments();

    tableColumn
      .integer('project_id')
      .references('id')
      .inTable('projects')
      .notNullable();

    tableColumn.text('description');

    tableColumn.text('notes');

    tableColumn
      .boolean('completed')
      .defaultTo(false)
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('actions');
};
