
exports.up = function(knex) {
  return knex.schema.table('fruits', tbl => {
    tbl.boolean('sweet');
  })
};

exports.down = function(knex) {
  // ALTER TABLE fruits DROP COLUMN sweet;
  return knex.schema.table('fruits', tbl => {
    tbl.dropColumn('sweet');
  });
};
