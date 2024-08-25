'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //one seat can belong to only one Airplane
      this.belongsTo(models.Airplane,{
        foreignKey:'airplaneId',
      });
    }
  }
  Seat.init({
    airplaneId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    row: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    col:{
      type:DataTypes.STRING,
      allowNull:false
    },
    type:{
      type:DataTypes.ENUM,
      values:['Business','Economy','Premium-Economy','First'],
      defaultValue:'Economy',
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};