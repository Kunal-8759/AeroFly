const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/Errors/app.error");

function validateCreateRequest(req,res,next){
    if(!req.body.modelNo){
        
        return res.status(StatusCodes.BAD_REQUEST).json({
            sucess:false,
            message:"something went wrong while creating Airplane",
            error:new AppError('Model number not found in the incoming request in the Correct Form',StatusCodes.BAD_REQUEST),
            data:{}
        })
    }
    next();
}

function validateUpdateRequest(req,res,next){
    if(!(req.body.modelNo || req.body.capacity)){
        return res.status(StatusCodes.BAD_REQUEST).json({
            sucess:false,
            message:"something went wrong while updating Airplane",
            error:new AppError('Model number or capacity not found in the incoming request in the Correct Form',StatusCodes.BAD_REQUEST),
            data:{}
        })
    }
    next();
}

module.exports={
    validateCreateRequest,
    validateUpdateRequest
}