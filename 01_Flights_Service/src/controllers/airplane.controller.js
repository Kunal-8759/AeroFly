const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");

//req.body={modelNo,capacity}
async function createAirplane(req,res,next){
    try {
        const airplane= await AirplaneService.createAirplane(req.body);
        return res.status(StatusCodes.CREATED).json({
            success:true,
            message:"airplane created successfully",
            data:airplane,
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

async function getAllAirplane(req,res){
    try {
        const airplanes=await AirplaneService.getAllAirplane();
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"all airplanes fetched successfully",
            data:airplanes,
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

async function getAirplane(req,res){
    try {
        const airplane=await AirplaneService.getAirplane(req.params.id);
        return res.status(StatusCodes.OK).json({
            success:true,
            message:" airplanes fetched successfully",
            data:airplane,
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

async function destroyAirplane(req,res){
    try {
        const response = await AirplaneService.destroyAirplane(req.params.id);
        return res.status(StatusCodes.OK).json({
            success:true,
            message:" airplanes deleted successfully",
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

async function updateAirplane(req,res){
    try {
        const response = await AirplaneService.updateAirplane(req.params.id,req.body);
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"airplanes updated successfully",
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
    createAirplane,
    getAllAirplane,
    getAirplane,
    destroyAirplane,
    updateAirplane
}