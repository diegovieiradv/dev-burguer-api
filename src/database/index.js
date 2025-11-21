import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.js';
import User from '../app/models/User.js';
import Product from '../app/models/Product.js';
import Category from '../app/models/Category.js';

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Seleciona o ambiente
    const environment = process.env.NODE_ENV || 'development';
    const config = databaseConfig[environment];

    // Conecta com o banco, desliga logs detalhados
    this.connection = new Sequelize({
      ...config,
      logging: false, // <- desliga logs SQL
    });

    // Inicializa os models
    models.map((model) => model.init(this.connection));

    // Sincroniza as tabelas sem apagar dados
    this.connection
      .sync({ alter: true })
      .then(() => console.log('Tabelas sincronizadas com sucesso!'))
      .catch((err) => console.error('Erro ao sincronizar tabelas:', err));
  }
}

export default new Database();
