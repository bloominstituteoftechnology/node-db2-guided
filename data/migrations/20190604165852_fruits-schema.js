
exports.up = function(knex, Promise) {
  return knex.schema.createTable('fruits', tbl => {
    tbl.increments();
    tbl.text('name', 128).unique().notNullable();
    tbl.decimal('avgWeightOz').notNullable();
    tbl.boolean('delicious').defaultTo(true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('fruits');
};
