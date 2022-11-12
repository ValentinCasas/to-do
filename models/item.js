'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.ListaItems,{foreignKey:'listaId'});
      Item.belongsTo(models.User,{foreignKey:'duenioId'});
    }
  }
  Item.init({
    titulo: DataTypes.STRING,
    fechaCreacion: DataTypes.DATE,
    fechaResolucion: DataTypes.DATE,
    descripcion: DataTypes.STRING,
    prioridad: DataTypes.STRING,
    fechaLimite: DataTypes.DATE,
    estado: DataTypes.STRING,
    duenioId: DataTypes.INTEGER,
    receptorId: DataTypes.INTEGER,
    //listaId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'item',
    timestamps: false,
  });
  return Item;
};