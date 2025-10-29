import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.js';
import User from '../app/models/User.js';

const models = [User];

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
