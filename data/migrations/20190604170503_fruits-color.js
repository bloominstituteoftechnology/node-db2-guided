
exports.up = function(knex, Promise) {
  return knex.schema.table('fruits', tbl => {  
    tbl.string('color', 128);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('fruits', tbl => {
    tbl.dropColumn('color');
  });
};
