const { randomUUID } = require('node:crypto');

const db = require('../../database');

class ContactRepository {
  findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = db.query(`SELECT * FROM tbl_contacts ORDER BY name ${direction}`);
    return rows;
  }

  findById(id) {
    const row = db.query('SELECT * FROM tbl_contacts WHERE id = ?', [id]);
    return row;
  }

  findByEmail(email) {
    const row = db.query('SELECT * FROM tbl_contacts WHERE email = ?', [email]);
    return row;
  }

  create({
    name, email, phone,
  }) {
    const row = db.query(
      `INSERT INTO tbl_contacts(id, name, email, phone)
      VALUES(?, ?, ?, ?)`,
      [randomUUID(), name, email, phone],
    );

    return row;
  }

  updateById(id, {
    name, email, phone,
  }) {
    const row = db.query(
      `UPDATE tbl_contacts
      SET name = ?, email = ?, phone = ?
      WHERE id = ?`,
      [name, email, phone, id],
    );

    return row;
  }

  deleteById(id) {
    const deleteContact = db.query('DELETE FROM tbl_contacts WHERE id = ?', [id]);
    return deleteContact;
  }
}

module.exports = new ContactRepository();
