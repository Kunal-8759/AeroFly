const { StatusCodes } = require("http-status-codes");
const { SeatRepository } = require("../repositories");
const AppError = require("../utils/Errors/app.error");

const seatRepo = new SeatRepository();

async function getSeats(id){
    try {
        console.log(id);
        const seat = await seatRepo.get(id);
        return seat;
    } catch (error) {
        console.log(error);
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('the seat you searched is not present',StatusCodes.NOT_FOUND);
        }
        throw new AppError('something went wrong while fetching seat',StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

module.exports={
    getSeats
}