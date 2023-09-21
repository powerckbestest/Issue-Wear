const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Cart, { foreignKey: 'userId' });
      this.hasMany(models.Order, { foreignKey: 'userId' });
      this.belongsTo(models.Role, { foreignKey: 'roleId' });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
