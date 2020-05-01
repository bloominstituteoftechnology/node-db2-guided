exports.up = function (knex) {
    return knex.schema.createTable("", (tbl) => {
        tbl.increments("id");
    });
};

exports.down = function (knex) {

};