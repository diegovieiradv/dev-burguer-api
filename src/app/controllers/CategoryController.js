import * as Yup from 'yup';
import Category from '../models/Category.js';

class CategoryController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });
    // Validação
    try {
      schema.validateSync(data, { abortEarly: false });
    } catch (err) {
      if (err.name === 'ValidationError') {
        return response
          .status(400)
          .json({ error: 'Falha na validação', messages: err.errors });
      }
    }

    // Pega dados

    const { name } = request.body;

    const existingCategory = await Category.findOne({ where: { name } });

    // Se já existe, retorna erro
    if (existingCategory) {
      return response.status(400).json({ error: 'Categoria já existe' });
    }

    // Se tiver arquivo
    let path = null;
    if (request.file) {
      path = request.file.filename;
    }

    // Salva no BD
    const newCategory = await Category.create({
      name,
    });

    return response.status(201).json(newCategory);
  }
  async index(request, response) {
    const categories = await Category.findAll();

    return response.status(200).json(categories);
  }
}

export default new CategoryController();
