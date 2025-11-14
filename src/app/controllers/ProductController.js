class ProductController {
  async store(request, response) {
    return response.status(201).json({ message: 'Product created' });
  }
}

export default new ProductController();