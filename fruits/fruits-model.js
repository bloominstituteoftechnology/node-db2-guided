const knex = require('knex');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './data/produce.db3'
  },
  useNullAsDefault: true
});

module.exports = {
  find,
  findById,
  add
}

function find() {
  return db('fruits');
}

function findById(id) {
  return db('fruits').where({ id });
}

async function add(fruit) {
  const [ id ] = await db('fruits').insert(fruit);

  return findById(id);
}