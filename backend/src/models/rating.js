'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {foreignKey: 'reviewed_id'});
      // define association here
    }
  }
  Rating.init({
    reviewer: DataTypes.STRING,
    reviewed_id: DataTypes.INTEGER,
    rating: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};