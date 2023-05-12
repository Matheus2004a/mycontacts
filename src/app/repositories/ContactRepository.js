const { randomUUID } = require('node:crypto');

const db = require('../../database');

class ContactRepository {
  findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = db.query(
      `SELECT tbl_contacts.*, tbl_categories.name AS category_name
      FROM tbl_contacts
      LEFT JOIN tbl_categories ON tbl_categories.id = tbl_contacts.tbl_categories_id
      ORDER BY tbl_categories.name ${direction}`,
    );
    return rows;
  }

  findById(id) {
    const row = db.query(
      `SELECT tbl_contacts.*, tbl_categories.name AS category_name
      FROM tbl_contacts
      LEFT JOIN tbl_categories ON tbl_categories.id = tbl_contacts.tbl_categories_id
      WHERE tbl_contacts.id = ?`,
      [id],
    );
    return row;
  }

  findByEmail(email) {
    const row = db.query('SELECT * FROM tbl_contacts WHERE email = ?', [email]);
    return row;
  }

  create({
    name, email, phone, category_id,
  }) {
    const row = db.query(
      `INSERT INTO tbl_contacts(id, name, email, phone, tbl_categories_id)
      VALUES(?, ?, ?, ?, ?)`,
      [randomUUID(), name, email, phone, category_id],
    );

    return row;
  }

  updateById(id, {
    name, email, phone, category_id,
  }) {
    const row = db.query(
      `UPDATE tbl_contacts
      SET name = ?, email = ?, phone = ?, tbl_categories_id = ?
      WHERE id = ?`,
      [name, email, phone, category_id, id],
    );

    return row;
  }

  deleteById(id) {
    const deleteContact = db.query('DELETE FROM tbl_contacts WHERE id = ?', [id]);
    return deleteContact;
  }
}

module.exports = new ContactRepository();
