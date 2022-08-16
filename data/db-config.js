const knex = require('knex')

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './data/produce2.db3'
  },
  useNullAsDefault: true
});

module.exports = db;