'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsTo(models.User, {
        foreignKey: "userId"
      });
      this.hasMany(models.Message, {
        foreignKey: "chatId"
      });
      this.belongsTo(models.Ride, {
        foreignKey: "rideId"
      })
      
    }
  }
  Chat.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};