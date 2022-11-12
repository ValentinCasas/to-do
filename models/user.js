'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Item, { foreignKey: 'id' });
      User.hasMany(models.ListaItems, { foreignKey: 'id' });

    }
  }
  User.init({
    githubId: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    mail: DataTypes.STRING,
    password: DataTypes.STRING,
    sessionId: DataTypes.STRING,
    cargo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    timestamps: false,
  });
  return User;
};