'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListaItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ListaItems.hasMany(models.Item, {foreignKey:'id'}); // ,{foreignkey:"por si no respeta la convencion"}
      ListaItems.belongsTo(models.User,{foreignKey:'userId'});
    }
  }
  ListaItems.init({
    titulo: DataTypes.STRING,
    categoria: DataTypes.STRING,
    fechaCreacion: DataTypes.DATE,
    fechaResolucion: DataTypes.DATE,
    estado: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ListaItems',
    tableName: 'listaitems',
    timestamps: false,
  });
  return ListaItems;
};