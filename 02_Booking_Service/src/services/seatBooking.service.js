
const axios = require('axios');
const db = require('../models');
const {BookingRepository,SeatBookingRepository}= require('../repositories');
const { FLIGHT_SERVICE_URL } = require('../config/server-config');
const AppError = require('../utils/Errors/app.error');
const { StatusCodes } = require('http-status-codes');

const bookingRepo = new BookingRepository();
const seatBookingRepo = new SeatBookingRepository();

// data : {
//     bookingId,
//     seats
// }
async function seatBooking(data){
    const transaction = await db.sequelize.transaction();
    try {
        const booking = await bookingRepo.get(data.bookingId,transaction);

        const flightId =booking.dataValues.flightId;
        const userId =booking.dataValues.userId;
        const bookingId =data.bookingId;

    
        await Promise.all(
            data.seats.map(async (seatId) =>{
                try {
                    const response = await axios.get(`${FLIGHT_SERVICE_URL}/api/v1/seats/${seatId}`);
                } catch (error) {
                    throw new AppError('the seat you requested to book is not present in the airplane',StatusCodes.NOT_FOUND);
                }
            })
        );

        const seatBooking=await Promise.all(
            data.seats.map(async (seatId) =>{
                const seatsbooked = await seatBookingRepo.createSeatBooking({
                    userId,
                    seatId,
                    bookingId,
                    flightId 
                },transaction);

                return seatsbooked;
            })
        );

        await transaction.commit();
        return seatBooking;

    } catch (error) {
        await transaction.rollback();
        if(error.name == 'SequelizeUniqueConstraintError'){
            throw new AppError('The seat you requested to Book is not available',StatusCodes.BAD_REQUEST);
        }
        if(error instanceof AppError){
            throw error;
        }
        throw new AppError('something went wrong while seat-Booking',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyUnpaidBooking(unpaidBookingId){
    try {
        const response = await seatBookingRepo.destroyUnpaidBooking(unpaidBookingId);
        return response;
    }
    catch(error){
        console.log(error);
    }
}

module.exports={
    seatBooking,
    destroyUnpaidBooking
}