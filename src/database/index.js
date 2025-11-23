import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.js';
import User from '../app/models/User.js';
import Product from '../app/models/Product.js';
import Category from '../app/models/Category.js';

const models = [User, Category, Product]; // <- Category antes de Product

class Database {
  constructor() {
    this.init();
  }

  init() {
    const environment = process.env.NODE_ENV || 'development';
    const config = databaseConfig[environment];

    this.connection = new Sequelize({ ...config, logging: false });

    // Inicializa models
    models
      .map(model => model.init(this.connection))
      .map(model => {
        if (model && typeof model.associate === 'function') {
          model.associate(this.connection.models);
        }
        return model;
      });

    this.connection
      .sync({ alter: true })
      .then(() => console.log('Tabelas sincronizadas!'))
      .catch(err => console.error('Erro ao sincronizar tabelas:', err));
  }
}

export default new Database();
