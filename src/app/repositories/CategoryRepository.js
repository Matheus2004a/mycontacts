const { randomUUID } = require('node:crypto');
const db = require('../../database');

class CategoryRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM tbl_categories');
    return rows;
  }

  async create({ name }) {
    const row = await db.query('INSERT INTO tbl_categories(id, name) VALUES(?, ?)', [randomUUID(), name]);
    return row;
  }
}

module.exports = new CategoryRepository();
