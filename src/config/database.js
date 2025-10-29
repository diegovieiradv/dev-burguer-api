export default {
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
  },
};
