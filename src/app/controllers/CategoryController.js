const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(req, res) {
    const categories = await CategoryRepository.findAll();

    if (!categories.length) return res.status(404).send({ message: 'No categories registered' });

    res.status(200).send(categories);
  }

  async store(req, res) {
    const { name } = req.body;

    if (!name) return res.status(404).send({ message: 'Name is required' });

    try {
      await CategoryRepository.create({ name });
      res.status(200).send({ message: 'Category created successfully' });
    } catch (error) {
      res.status(409).send({ message: error.message });
    }
  }
}

module.exports = new CategoryController();
