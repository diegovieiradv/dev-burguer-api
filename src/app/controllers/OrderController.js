import * as Yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

class OrderController {
  async store(request, response) {
    const schema = Yup.object({
      products: Yup.array()
        .of(
          Yup.object({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          }),
        )
        .required(),
    });

    const data = {
      ...request.body,
      price: Number(request.body.price),
    };

    try {
      schema.validateSync(data, { abortEarly: false, strict: true });
    } catch (err) {
      return response
        .status(400)
        .json({ error: 'Falha na validação', messages: err.errors });
    }

    const { userId, userName } = request;
    const { products } = request.body;

    const productIds = products.map((product) => product.id);
    const findedProducts = await Product.findAll({
      where: {
        id: productIds,
      },
      include: {
        model: Category,
        as: 'category',
        attributes: ['name'],
      },
    });

    const mapedProducts = findedProducts.map((product) => {
      const quantity = products.find((p) => p.id === product.id).quantity;
      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        Category: product.category.name,
        category: product.category_id,
        url: product.url,
        quantity,
      };
      return newProduct;
    });

    const order = {
      user: {
        id: userId,
        name: userName,
      },
      products: mapedProducts,
      status: 'Pedido realizado com sucesso!',
    };

    return response.status(201).json(order);
  }
}

export default new OrderController();
