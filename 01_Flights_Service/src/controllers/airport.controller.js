const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");

//req.body={name,code,adress,cityId}
async function createAirport(req,res){
    try {
        const airport= await AirportService.createAirport(req.body);
        return res.status(StatusCodes.CREATED).json({
            success:true,
            message:"airport created successfully",
            data:airport,
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

async function getAllAirport(req,res){
    try {
        const airports=await AirportService.getAllAirport();
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"all airports fetched successfully",
            data:airports,
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

async function getAirport(req,res){
    try {
        const airport=await AirportService.getAirport(req.params.id);
        return res.status(StatusCodes.OK).json({
            success:true,
            message:" airports fetched successfully",
            data:airport,
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

async function destroyAirport(req,res){
    try {
        const response = await AirportService.destroyAirport(req.params.id);
        return res.status(StatusCodes.OK).json({
            success:true,
            message:" airport deleted successfully",
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

async function updateAirport(req,res){
    try {
        const response = await AirportService.updateAirport(req.params.id,req.body);
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"airport updated successfully",
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
    createAirport,
    getAllAirport,
    getAirport,
    destroyAirport,
    updateAirport
}