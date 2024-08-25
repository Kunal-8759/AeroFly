'use strict';
const {
  Model
} = require('sequelize');

const {USER_ROLES_ENUMS} = require('../utils/common/enum');
const { ADMIN,CUSTOMER,FLIGHT_COMPANY} =USER_ROLES_ENUMS;

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User , {through : 'User_Roles' , as : 'user'});
    }
  }
  Role.init({
    name : {
      type: DataTypes.ENUM,
      values:[ADMIN,CUSTOMER,FLIGHT_COMPANY],
      allowNull : false,
      defaultValue : CUSTOMER
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};