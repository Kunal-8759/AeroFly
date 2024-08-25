const { StatusCodes } = require("http-status-codes");
const { BookingService ,SeatBookingService} = require("../services");

const Redis = require('ioredis');
const redisCache = new Redis(); 


async function createBooking(req,res){
    try {
        const response =await BookingService.createBooking(req.body);
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"Booking done successfully",
            data:response,
            error:{}
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            success:false,
            message:"something went wrong",
            data:{},
            error:error
        });
    }
}

async function makePayment(req,res){
    try {
        const idempotencyKey=req.headers['x-idempotency-key'];
        if(!idempotencyKey){
            return res.status(StatusCodes.BAD_REQUEST).json({
                success:false,
                message:"idempotency Key is missing",
                data:{},
                error:{}
            })
        }
        //if idempotency Key is present in the redis
        console.log(await redisCache.get(idempotencyKey));
        if(await redisCache.get(idempotencyKey)){
            return res.status(StatusCodes.BAD_REQUEST).json({
                success:false,
                message:"cannot retry on a successfully Payment",
                data:{},
                error:{}
            })
        }
        //if idempotency key is not present in the redis
        const response = await BookingService.makePayment(req.body);

        redisCache.set(idempotencyKey,idempotencyKey);
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"Payment done successfully",
            data:response,
            error:{}
        });

    } catch (error) {
        return res.status(error.statusCode).json({
            success:false,
            message:"something went wrong",
            data:{},
            error:error
        });
    }
}

async function seatBooking(req,res){
    try {
        const idempotencyKey=req.headers['y-idempotency-key'];
        if(!idempotencyKey){
            return res.status(StatusCodes.BAD_REQUEST).json({
                success:false,
                message:"idempotency Key is missing",
                data:{},
                error:{}
            })
        }

        if(await redisCache.get(idempotencyKey)){
            return res.status(StatusCodes.BAD_REQUEST).json({
                success:false,
                message:"cannot retry on a successfully seat-booking",
                data:{},
                error:{}
            })
        }
        //if idempotenccy key is not avilable in the redis
        const response =await SeatBookingService.seatBooking(req.body);

        redisCache.set(idempotencyKey,idempotencyKey);
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"seat-Booking done successfully",
            data:response,
            error:{}
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            success:false,
            message:"something went wrong",
            data:{},
            error:error
        });
    }
}

module.exports={
    createBooking,
    makePayment,
    seatBooking
}