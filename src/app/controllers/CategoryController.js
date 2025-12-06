import * as Yup from 'yup';
import Category from '../models/Category.js';

class CategoryController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    const data = {
      name: request.body.name,
    };

    try {
      schema.validateSync(data, { abortEarly: false });
    } catch (err) {
      return response
        .status(400)
        .json({ error: 'Falha na validação', messages: err.errors });
    }

    const { name } = request.body;

    let path = null;
    if (request.file) {
      path = request.file.filename;
    }

    const existingCategory = await Category.findOne({ where: { name } });

    if (existingCategory) {
      return response.status(400).json({ error: 'Categoria já existe' });
    }

    const newCategory = await Category.create({
      name,
      path,
    });

    return response.status(201).json(newCategory);
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
    });

    const data = {
      name: request.body.name,
    };

    try {
      schema.validateSync(data, { abortEarly: false });
    } catch (err) {
      return response
        .status(400)
        .json({ error: 'Falha na validação', messages: err.errors });
    }

    const { id } = request.params; // ← FALTAVA
    const { name } = request.body;

    let path = null;
    if (request.file) {
      path = request.file.filename;
    }

    const existingCategory = await Category.findOne({
      where: { name },
    });

    if (existingCategory) {
      return response.status(400).json({ error: 'Categoria já existe' });
    }

    // ← Ajuste mínimo e correto
    const updated = await Category.update(
      {
        name,
        path,
      },
      {
        where: { id },
      },
    );

    return response
      .status(200)
      .json({ message: 'Categoria atualizada', updated });
  }

  async index(request, response) {
    const categories = await Category.findAll();
    return response.status(200).json(categories);
  }
}

export default new CategoryController();
