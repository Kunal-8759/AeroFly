const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/Errors/app.error");

function validateCreateRequest(req,res,next){
    if(!req.body.flightNumber){
        return res.status(StatusCodes.BAD_REQUEST).json({
            sucess:false,
            message:"something went wrong while creating Flight",
            error:new AppError('flightNumber not found in the incoming request in the Correct Form',StatusCodes.BAD_REQUEST),
            data:{}
        });
    }
    else if(!req.body.airplaneId){
        return res.status(StatusCodes.BAD_REQUEST).json({
            sucess:false,
            message:"something went wrong while creating Flight",
            error:new AppError('airplaneId not found in the incoming request in the Correct Form',StatusCodes.BAD_REQUEST),
            data:{}
        });
    }
    else if(!req.body.departureAirportId){
        return res.status(StatusCodes.BAD_REQUEST).json({
            sucess:false,
            message:"something went wrong while creating Flight",
            error:new AppError('departureAirportId not found in the incoming request in the Correct Form',StatusCodes.BAD_REQUEST),
            data:{}
        });
    }
    else if(!req.body.arrivalAirportId){
        return res.status(StatusCodes.BAD_REQUEST).json({
            sucess:false,
            message:"something went wrong while creating Flight",
            error:new AppError('arrivalAirportId not found in the incoming request in the Correct Form',StatusCodes.BAD_REQUEST),
            data:{}
        });
    }else if(!req.body.arrivalTime){
        return res.status(StatusCodes.BAD_REQUEST).json({
            sucess:false,
            message:"something went wrong while creating Flight",
            error:new AppError('arrivalTime not found in the incoming request in the Correct Form',StatusCodes.BAD_REQUEST),
            data:{}
        });
    }else if(!req.body.departureTime){
        return res.status(StatusCodes.BAD_REQUEST).json({
            sucess:false,
            message:"something went wrong while creating Flight",
            error:new AppError('departureTime not found in the incoming request in the Correct Form',StatusCodes.BAD_REQUEST),
            data:{}
        });
    }else if(!req.body.price){
        return res.status(StatusCodes.BAD_REQUEST).json({
            sucess:false,
            message:"something went wrong while creating Flight",
            error:new AppError('price not found in the incoming request in the Correct Form',StatusCodes.BAD_REQUEST),
            data:{}
        });
    }
    else if(!req.body.totalSeats){
        return res.status(StatusCodes.BAD_REQUEST).json({
            sucess:false,
            message:"something went wrong while creating Flight",
            error:new AppError('totalSeats not found in the incoming request in the Correct Form',StatusCodes.BAD_REQUEST),
            data:{}
        });
    }
    else{
        next();
    }

    
}

function validateUpdateSeatsRequest(req, res, next) {
    if(!req.body.seats) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            sucess:false,
            message:"something went wrong while updating Seats",
            error:new AppError('seats not found in the incoming request in the Correct Form',StatusCodes.BAD_REQUEST),
            data:{}
        });        
    }
    next();
}

module.exports={
    validateCreateRequest,
    validateUpdateSeatsRequest
}