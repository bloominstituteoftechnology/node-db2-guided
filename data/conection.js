const knex = require("knex");

const knexfile = require('.../knexfile.js');

const knexConfig = knexfile.development;

// //configure the connection to the database
// const knexConfig = {
//     client: 'sqlite3', // db driver
//     connection: { //could be an object or a string
//         filename: './data/produce.db3'
//     },
//     useNullAsDefault: true // Only needed for Sqlite3
// };

module.exports = knex(knexConfig);