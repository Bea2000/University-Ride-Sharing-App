'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Ride, { foreignKey: 'ride_id'})
    }
  }
  Request.init({
    requester: DataTypes.STRING,
    ride_driver: DataTypes.STRING,
    accepted: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};