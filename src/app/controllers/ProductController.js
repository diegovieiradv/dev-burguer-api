import * as Yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      category_id: Yup.number().required(),
      price: Yup.number().required().positive(),
      offer: Yup.boolean(),
    });

    const data = {
      ...request.body,
      price: Number(request.body.price),
    };

    try {
      schema.validateSync(data, { abortEarly: false });
    } catch (err) {
      return response
        .status(400)
        .json({ error: 'Falha na validação', messages: err.errors });
    }

    const { name, price, offer } = data;

    const category_id = Number(data.category_id);

    let path;
    if (request.file) {
      const { filename } = request.file;
      path = filename;
    }

    const newProduct = await Product.create({
      name,
      price,
      category_id,
      path,
      offer,
    });

    return response.status(201).json(newProduct);
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
      category_id: Yup.number(),
      price: Yup.number().positive(),
      offer: Yup.boolean(),
    });

    const data = {
      ...request.body,
      price: Number(request.body.price),
    };

    try {
      schema.validateSync(data, { abortEarly: false });
    } catch (err) {
      return response
        .status(400)
        .json({ error: 'Falha na validação', messages: err.errors });
    }

    // ← PEGAR OS CAMPOS DO BODY (isso estava faltando)
    const { name, price, offer, category_id } = data;

    const { id } = request.params;

    // ← update retorna um array: [1] ou [0]
    const [updated] = await Product.update(
      {
        name,
        price,
        category_id,
        path,
        offer,
      },
      {
        where: { id },
      },
    );

    return response
      .status(200)
      .json({ message: 'Produto atualizado', updated });
  }

  async index(request, response) {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
      },
    });
    return response.status(200).json(products);
  }
}

export default new ProductController();
