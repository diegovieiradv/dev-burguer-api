import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.js';
import User from '../app/models/User.js';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Conecta com o banco
    this.connection = new Sequelize(databaseConfig);

    // Inicializa os models
    models.map((model) => model.init(this.connection));

    // Sincroniza as tabelas sem apagar os dados
    this.connection
      .sync({ alter: true }) // ajusta colunas sem apagar dados
      .then(() => console.log('Tabelas sincronizadas com sucesso!'))
      .catch((err) => console.error('Erro ao sincronizar tabelas:', err));
  }
}

// Exporta a instância da Database para usar em outros arquivos
export default new Database();
