'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    
    static associate(models) {
      //one airport should belong to one city only 
      this.belongsTo(models.City,{
        foreignKey:'cityId',
        as:'city'
      });

      //from one airport many flights departure can takes place
      this.hasMany(models.Flight, {
        foreignKey: 'departureAirportId',
        onDelete: 'CASCADE'
      });

      //from one airport many flights arrival can take place
      this.hasMany(models.Flight, {
        foreignKey: 'arrivalAirportId',
        onDelete: 'CASCADE'
      });

    }
  }
  Airport.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    code: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    adress: {
      type: DataTypes.STRING,
      unique:true
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};