import { Sequelize } from 'sequelize';
import mongoose, { mongo } from 'mongoose';
import databaseConfig from '../config/database.js';
import User from '../app/models/User.js';
import Product from '../app/models/Product.js';
import Category from '../app/models/Category.js';

const models = [User, Category, Product]; // <- Category antes de Product

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      );

    this.connection
      .sync({ alter: true })
      .then(() => console.log('Tabelas sincronizadas!'))
      .catch((err) => console.error('Erro ao sincronizar tabelas:', err));
  }
  mongo() {
    this.mongooseConnection = mongoose.connect(
      'mongodb://localhost:27017/devburguer',
    );
  }
}
export default new Database();
