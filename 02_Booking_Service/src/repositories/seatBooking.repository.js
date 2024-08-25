const CrudRepository = require("./crud.repository");
const {SeatBooking} = require('../models');

class SeatBookingRepository extends CrudRepository{
    constructor(){
        super(SeatBooking);
    }
    async createSeatBooking(data,transaction){
        const response = await SeatBooking.create(data,{transaction:transaction});
        return response;
    }

    async destroyUnpaidBooking(unpaidBookingId){
        const response = await SeatBooking.destroy({
            where : {
                bookingId : unpaidBookingId
            }
        });
        return response;
        
    }

    async getSeats(bookingId){
        const response =await SeatBooking.findAll({
            where : {
                bookingId :bookingId
            },
            attributes: ['seatId'] 
        });

        const seatsIds = response.map(seat => seat.seatId);
        return seatsIds;
    }
}

module.exports=SeatBookingRepository;