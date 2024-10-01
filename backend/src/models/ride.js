'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ride extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Request, {foreignKey: 'ride_id'});
      this.hasOne(models.Chat, {
        foreignKey: "rideId"
      })
    }
  }
  Ride.init({
    driver: DataTypes.STRING,
    comuna: DataTypes.STRING,
    modelo: DataTypes.STRING,
    patente: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    campus: DataTypes.STRING,
    img: DataTypes.INTEGER,
    direccion: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Ride',
  });
  return Ride;
};