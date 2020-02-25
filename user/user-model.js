const db = require('../data/db-config.js');

function get() {
  return db('users');
}

function getBy(filter) {
  return db('users')
    .where(filter)
    .first();
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return getBy({ id });
}

module.exports = {
  get,
  getBy,
  add
};