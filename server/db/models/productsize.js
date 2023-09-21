const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductSize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Cart, { foreignKey: 'productSizeId' });
      this.hasMany(models.OrderList, { foreignKey: 'productSizeId' });
      this.belongsTo(models.Product, { foreignKey: 'productId' });
      this.belongsTo(models.Size, { foreignKey: 'sizeId' });
    }
  }
  ProductSize.init(
    {
      productId: DataTypes.INTEGER,
      sizeId: DataTypes.INTEGER,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ProductSize',
    },
  );
  return ProductSize;
};
