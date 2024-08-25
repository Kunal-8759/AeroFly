const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/Errors/app.error");

function validateCreateRequest(req,res,next){
    if(!req.body.name){
        
        return res.status(StatusCodes.BAD_REQUEST).json({
            sucess:false,
            message:"something went wrong while creating city",
            error:new AppError('city not found in the incoming request in the Correct Form',StatusCodes.BAD_REQUEST),
            data:{}
        })
    }
    next();
}

function validateUpdateRequest(req,res,next){
    if(!(req.body.name)){
        return res.status(StatusCodes.BAD_REQUEST).json({
            sucess:false,
            message:"something went wrong while updating City",
            error:new AppError('name not found in the incoming request in the Correct Form',StatusCodes.BAD_REQUEST),
            data:{}
        })
    }
    next();
}

module.exports={
    validateCreateRequest,
    validateUpdateRequest
}