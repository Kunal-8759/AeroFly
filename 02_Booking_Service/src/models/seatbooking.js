'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SeatBooking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      // Example:
      // this.belongsTo(models.User, { foreignKey: 'userId' });
      // this.belongsTo(models.Seat, { foreignKey: 'seatId' });
      // this.belongsTo(models.Booking, { foreignKey: 'bookingId' });
      // this.belongsTo(models.Flight, { foreignKey: 'flightId' });
    }
  }

  SeatBooking.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      seatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      flightId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'SeatBooking',
      tableName: 'seatBookings',
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['seatId', 'flightId'],
          name: 'unique_seat_flight',
        },
      ],
    }
  );

  return SeatBooking;
};
