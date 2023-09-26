const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.hasMany(models.OrderList, { foreignKey: 'orderId' });
      this.belongsTo(models.Status, { foreignKey: 'statusId' });
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      statusId: DataTypes.INTEGER,
      address: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );
  return Order;
};
