const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(req, res) {
    const categories = await CategoryRepository.findAll();

    if (!categories.length) return res.status(404).send({ message: 'Nenhuma categoria cadastrada' });

    res.status(200).send(categories);
  }

  async store(req, res) {
    const { name } = req.body;

    if (!name) return res.status(404).send({ message: 'Nome é obrigatório' });

    try {
      await CategoryRepository.create({ name });
      res.status(200).send({ message: 'Categoria criada com sucesso' });
    } catch (error) {
      res.status(409).send({ message: error.message });
    }
  }
}

module.exports = new CategoryController();
