
exports.up = function(knex) {
  return knex.schema.createTable('fruits', tbl => {
    tbl.increments('id');
    tbl.string('name', 128).unique().notNullable();
    tbl.decimal('avgWeightOz').notNullable();
    tbl.boolean('delicous')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExist('fruits');
};
