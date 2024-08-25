const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/Errors/app.error");

function validateCreateRequest(req,res,next){
    if(!req.body.name){
        
        return res.status(StatusCodes.BAD_REQUEST).json({
            sucess:false,
            message:"something went wrong while creating Airport",
            error:new AppError('name not found in the incoming request in the Correct Form',StatusCodes.BAD_REQUEST),
            data:{}
        });
    }
    else if(!req.body.code){
        return res.status(StatusCodes.BAD_REQUEST).json({
            sucess:false,
            message:"something went wrong while creating Airport",
            error:new AppError('code not found in the incoming request in the Correct Form',StatusCodes.BAD_REQUEST),
            data:{}
        });
    }
    else if(!req.body.cityId){
        return res.status(StatusCodes.BAD_REQUEST).json({
            sucess:false,
            message:"something went wrong while creating Airport",
            error:new AppError('cityId not found in the incoming request in the Correct Form',StatusCodes.BAD_REQUEST),
            data:{}
        });
    }
    else{
        next();
    }

    
}

function validateUpdateRequest(req,res,next){
    if(!(req.body.name || req.body.cityId || req.body.code )){
        return res.status(StatusCodes.BAD_REQUEST).json({
            sucess:false,
            message:"something went wrong while updating Airplane",
            error:new AppError('name or cityId or code not found in the incoming request in the Correct Form',StatusCodes.BAD_REQUEST),
            data:{}
        })
    }
    next();
}

module.exports={
    validateCreateRequest,
    validateUpdateRequest
}