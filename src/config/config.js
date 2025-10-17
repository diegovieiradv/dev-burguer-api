import database from './database.js';

// Configuração para ambientes do Sequelize
export default {
  development: database,
  test: database,
  production: database,
};
