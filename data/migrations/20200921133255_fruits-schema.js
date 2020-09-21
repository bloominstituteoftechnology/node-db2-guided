
exports.up = function(knex) {
    return knex.schema.createTable( 'fruits', tbl => {
        tbl.increments( 'id' );
        tbl.string('name' , 128).unique().notNullable();
        tbl.decimal('aveWeightOz').notNullable();
        tbl.boolean('delicious');
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('fruits');
  
};
