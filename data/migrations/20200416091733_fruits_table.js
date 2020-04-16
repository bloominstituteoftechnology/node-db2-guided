
exports.up = function(knex) {
    return knex.schema.createTable('fruits', tbl => {
        tbl.increments('id');
        tbl.string('name', 128).notNullable().unique();
        tbl.decimal('avgWeightOz');
        tbl.boolean('delicious').defaultTo(true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('fruits');
};
