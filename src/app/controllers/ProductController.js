import * as Yup from "yup";
import Product from '../models/Product.js';
import Category from '../models/Category.js';

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      category_id: Yup.string().required(),
      price: Yup.number().required().positive(),
    });

    const data = {
      ...request.body,
      price: Number(request.body.price),
    };

    try {
      schema.validateSync(data, { abortEarly: false });
    } catch (err) {
      if (err.name === "ValidationError") {
        return response
          .status(400)
          .json({ error: "Falha na validação", messages: err.errors });
      }
    }

    const { name, price } = data;
    const category_id = Number(data.category_id);

    let path = null;
    if (request.file) path = request.file.filename;

    const newProduct = await Product.create({
      name,
      price,
      category_id,
      path,
    });

    return response.status(201).json(newProduct);
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
