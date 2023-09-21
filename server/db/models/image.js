const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }
  Image.init(
    {
      productId: DataTypes.INTEGER,
      url: DataTypes.TEXT,
      forConstructor: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Image',
    },
  );
  return Image;
};
