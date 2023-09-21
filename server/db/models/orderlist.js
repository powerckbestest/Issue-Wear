const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Order, { foreignKey: 'orderId' });
      this.belongsTo(models.ProductSize, { foreignKey: 'productSizeId' });
    }
  }
  OrderList.init(
    {
      orderId: DataTypes.INTEGER,
      productSizeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'OrderList',
    },
  );
  return OrderList;
};
