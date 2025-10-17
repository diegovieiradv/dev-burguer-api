
import { model } from 'sequelize';

class User extends model {
  static init(sequelize) {
    super.init({
      name: sequelize.STRING,
      email: sequelize.STRING,
      password_hash: sequelize.STRING,
      admin: sequelize.BOOLEAN,
    }, { sequelize });
  }
}

  export default User;

