const { randomUUID } = require('node:crypto');

let contacts = [
  {
    id: randomUUID(),
    name: 'Matheus Aurélio',
    email: 'matheusaurelio2004@gmail.com',
    phone: '12312131',
    category_id: randomUUID(),
  },
  {
    id: randomUUID(),
    name: 'Ana Luiza',
    email: 'aninha2004@gmail.com',
    phone: '1231212901',
    category_id: randomUUID(),
  },
];

class ContactRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.id === id));
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.email === email));
    });
  }

  create({
    name, email, phone,
  }) {
    return new Promise((resolve) => {
      const newContact = {
        id: randomUUID(),
        name,
        email,
        phone,
        category_id: randomUUID(),
      };

      contacts.push(newContact);
      resolve(contacts);
    });
  }

  updateById(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));

      resolve(contacts);
    });
  }

  deleteById(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve(contacts);
    });
  }
}

module.exports = new ContactRepository();
