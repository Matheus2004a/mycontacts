const ContactRepository = require('../repositories/ContactRepository');

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

    const [contact] = await ContactRepository.findById(id);

    if (!contact) return res.status(404).send({ message: 'Contact not found' });

    res.send(contact);
  }

  // create a new register
  async store(req, res) {
    const {
      name, email, phone, category_id,
    } = req.body;

    const [contactExists] = await ContactRepository.findByEmail(email);

    if (contactExists) return res.status(409).send({ message: 'Contact already exist' });

    const contact = await ContactRepository.create({
      name, email, phone, category_id,
    });

    res.status(201).send(contact);
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      name, email, phone, category_id,
    } = req.body;

    const [contactExists] = await ContactRepository.findById(id);
    if (!contactExists) return res.status(404).send({ message: 'Contact not found' });

    const [contactByEmail] = await ContactRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return res.status(409).send({ message: 'Contact already exist' });
    }

    await ContactRepository.updateById(id, {
      name, email, phone, category_id,
    });

    res.status(202).send({ message: 'Contact update successfully' });
  }

  async delete(req, res) {
    const { id } = req.params;

    const [contact] = await ContactRepository.findById(id);

    if (!contact) return res.status(404).send({ message: 'Contact not found' });

    await ContactRepository.deleteById(id);

    res.status(202).send({ message: 'Contact deleted successfully' });
  }
}

module.exports = new ContactController();
