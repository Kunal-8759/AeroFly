const CrudRepository = require("./crud.repository");
const {Booking} =require('../models');

const {BOOKING_STATUS} =require('../utils/common/enum');
const { Op } = require("sequelize");

class BookingRepository extends CrudRepository{
    constructor(){
        super(Booking);
    }

    async createBooking(data,transaction){
        const response = await Booking.create(data,{transaction:transaction});
        return response;
    }

    async get(data, transaction) {
        const response = await Booking.findByPk(data, {transaction: transaction});
        if(!response) {
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async update(id, data, transaction) { // data -> {col: value, ....}
        const response = await Booking.update(data, {
            where: {
                id: id
            }
        }, {transaction: transaction});
        return response;
    }

    async cancelOldBookings(unpaidBookingId){
        const response =await Booking.update({
            status:BOOKING_STATUS.CANCELLED
        },{
            where: {
                id: unpaidBookingId
            }
        });
        return response;
    }

    async getOldBooking(timestamp){
        const response =await Booking.findAll(
        {
            where:{
                [Op.and]:[
                    {
                        createdAt:{
                            [Op.lt]:timestamp
                        }
                    },
                    {
                        status : {
                            [Op.ne] : BOOKING_STATUS.BOOKED
                        }
                    },
                    {
                        status:{
                            [Op.ne]:BOOKING_STATUS.CANCELLED
                        }
                    }
                ]
            },
            attributes: ['id'] //only select the bookingId
        });

        const bookingIds = response.map(booking => booking.id);
        return bookingIds;
    }

}

module.exports=BookingRepository;