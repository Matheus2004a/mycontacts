const ContactRepository = require('../repositories/ContactRepository');
const isInvalidUUID = require('../utils/isValidUUID');

class ContactController {
  // list all registers
  async index(req, res) {
    const { orderBy } = req.query;
    const contacts = await ContactRepository.findAll(orderBy);

    if (contacts.length <= 0) return res.status(404).send({ message: 'No contacts registered' });

    res.send(contacts);
  }

  // get one register
  async show(req, res) {
    const { id } = req.params;

    if (!isInvalidUUID(id)) {
      return res.status(400).send({ message: 'Invalid contact id' });
    }

    const [contact] = await ContactRepository.findById(id);

    if (!contact) return res.status(404).send({ message: 'Contact not found' });

    res.send(contact);
  }

  // create a new register
  async store(req, res) {
    const {
      name, email, phone, category_id,
    } = req.body;

    if (category_id && !isInvalidUUID(category_id)) {
      return res.status(400).send({ message: 'Invalid category id' });
    }

    if (email) {
      const [contactExists] = await ContactRepository.findByEmail(email);

      if (contactExists) return res.status(409).send({ message: 'Contact already exist' });
    } else {
      return res.status(400).send({ message: 'Fill your email' });
    }

    await ContactRepository.create({
      name,
      email,
      phone,
      category_id: category_id || null,
    });

    res.status(201).send({ message: 'Contact created successfully' });
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      name, email, phone, category_id,
    } = req.body;

    if (!isInvalidUUID(id)) {
      return res.status(400).send({ message: 'Invalid contact id' });
    }

    const [contactExists] = await ContactRepository.findById(id);
    if (!contactExists) return res.status(404).send({ message: 'Contact not found' });

    if (email) {
      const [contactByEmail] = await ContactRepository.findByEmail(email);

      if (contactByEmail && contactByEmail.id !== id) {
        return res.status(409).send({ message: 'Contact already exist' });
      }
    } else {
      return res.status(400).send({ message: 'Fill your email' });
    }

    await ContactRepository.updateById(id, {
      name,
      email,
      phone,
      category_id: category_id || null,
    });

    res.status(202).send({ message: 'Contact update successfully' });
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!isInvalidUUID(id)) {
      return res.status(400).send({ message: 'Invalid contact id' });
    }

    const [contact] = await ContactRepository.findById(id);

    if (!contact) return res.status(404).send({ message: 'Contact not found' });

    await ContactRepository.deleteById(id);

    res.status(202).send({ message: 'Contact deleted successfully' });
  }
}

module.exports = new ContactController();
