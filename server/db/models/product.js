const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Category, { foreignKey: 'categoryId' });
      this.belongsTo(models.Color, { foreignKey: 'colorId' });
      this.hasMany(models.Image, { foreignKey: 'productId' });
      this.hasMany(models.ProductSize, { foreignKey: 'productId' });
    }
  }
  Product.init(
    {
      title: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      colorId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );
  return Product;
};
