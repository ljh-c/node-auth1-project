const db = require('../data/db-config.js');

function get() {
  return db('users');
}

function getById(id) {
  return db('users')
    .where({ id })
    .first();
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return getById(id);
}

module.exports = {
  get,
  getById,
  add
};