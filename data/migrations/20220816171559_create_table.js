
exports.up = function(knex) {
  return knex.schema.createTable('fruits', tbl => {
    tbl.increments();
    tbl.varchar('name', 100).notNullable().unique();
    tbl.varchar('color', 100).notNullable();
    tbl.boolean('delicious');
    tbl.decimal('avgWeightOz').notNullable();
  });
};

exports.down = function(knex) {
  
};
