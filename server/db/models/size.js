const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.ProductSize, { foreignKey: 'sizeId' });
    }
  }
  Size.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Size',
    },
  );
  return Size;
};
