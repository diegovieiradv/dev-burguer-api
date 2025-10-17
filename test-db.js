import { Sequelize } from 'sequelize';

const db = new Sequelize('dev-burger-db', 'admin', '123456', {
  host: 'localhost',
  port: 5433,
  dialect: 'postgres',
});

async function test() {
  try {
    await db.authenticate();
    console.log('✅ Node consegue conectar ao banco');
  } catch (err) {
    console.error('❌ Erro na conexão:', err.message);
  } finally {
    await db.close();
  }
}

test();
