import Sequelize, { Model } from "sequelize";

class Product extends Model {
  static init(sequelize, DataTypes) {
    Model.init({
      name: Sequelize.STRING,
      category: Sequelize.STRING,
      price: Sequelize.INTEGER,
     path: Sequelize.STRING,
     url: {
      type: Sequelize.VIRTUAL,
      get (){
        return `http://localhost:3001/product-file/${this.path}`
      }
     }
    }, {sequelize, tableName: 'products'});
  }
}

export default Product;
