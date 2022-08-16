const db = require('../../data/db-config');

function getAll() {
  return db('fruits');
}

function getById(id) {
  return db('fruits').where('id', id).first();
}

async function create(fruit) {
  const [id] = await db('fruits').insert(fruit);
  return getById(id);
}

module.exports = {
  getAll,
  getById,
  create,
};
