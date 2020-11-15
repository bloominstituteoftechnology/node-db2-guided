exports.up = function (knex) {
  return knex.schema.createTable("fruits", (tbl) => {
    tbl.increments();
    tbl.string("name", 25).unique().notNullable();
    tbl.decimal("avgWeightOz").notNullable();
    tbl.boolean("delicious");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("fruits");
};
