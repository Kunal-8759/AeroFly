'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // one airplane can do many flights
      this.hasMany(models.Flight, {
        foreignKey: 'airplaneId',
        onDelete: 'CASCADE'
      });

      //one Airplane has many seats
      this.hasMany(models.Seat, {
        foreignKey: 'airplaneId',
        onDelete: 'CASCADE'
      });

    }
  }
  Airplane.init({
    modelNo: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        isAlphanumeric:true
      }
    },
    capacity:{
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue:0,
      validate:{
        max:1000
      }
    }
  }, {
    sequelize,
    modelName: 'Airplane',
  });
  return Airplane;
};