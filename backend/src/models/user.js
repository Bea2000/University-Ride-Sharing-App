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
      this.hasMany(models.Rating, {foreignKey: 'reviewed_id'});
      // define association here
      this.hasMany(models.Chat, {
        foreignKey: "userId"
      });
      this.hasMany(models.Message, {
        foreignKey: "userId"
      });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    img: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};