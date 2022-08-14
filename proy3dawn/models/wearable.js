'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wearable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  wearable.init({
    idW: DataTypes.INTEGER,
    idD: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    marca: DataTypes.STRING,
    modelo: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    touch: DataTypes.BOOLEAN,
    enlazado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'wearable',
  });
  return wearable;
};