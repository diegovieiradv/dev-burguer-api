import * as Yup from "yup";
import Product from '../models/Product.js';

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      category: Yup.string().required(),
      price: Yup.number().required().positive(),
    });

    // Ajuste no price
    const data = {
      ...request.body,
      price: Number(request.body.price),
    };

    // Validação
    try {
      schema.validateSync(data, { abortEarly: false });
    } catch (err) {
      if (err.name === "ValidationError") {
        return response
          .status(400)
          .json({ error: "Falha na validação", messages: err.errors });
      }
    }

    // Pega dados
    const { name, price, category } = data;

    // Se tiver arquivo
    let path = null;
    if (request.file) {
      path = request.file.filename;
    }

    // Salva no BD
    const newProduct = await Product.create({
      name,
      price,
      category,
      path,
    });

    return response.status(201).json(newProduct);
  }
   async index(request, response){
    const products = await Product.findAll()

    return response.status(200).json(products)
    }
}

export default new ProductController();
