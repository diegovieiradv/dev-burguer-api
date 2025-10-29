module.exports = {
  development: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'admin',
    password: '123456',
    database: 'dev-burger-dev',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
    logging: false,
  },

  test: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'admin',
    password: '123456',
    database: 'dev-burger-test',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
    logging: false,
  },

  production: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'admin',
    password: '123456',
    database: 'dev-burger-prod',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
    logging: false,
  },
};
