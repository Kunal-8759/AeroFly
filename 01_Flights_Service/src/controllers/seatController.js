const { StatusCodes } = require('http-status-codes');
const {SeatService} = require('../services');

async function getSeat(req,res){
    try {
        const  response= await SeatService.getSeats(req.params.id);
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"seat fetched successfully",
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

module.exports={
    getSeat
}