const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");

//req.body={name:"London"}
async function createCity(req,res){
    try {
        const city= await CityService.createCity(req.body);
        return res.status(StatusCodes.CREATED).json({
            success:true,
            message:"city created successfully",
            data:city,
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

async function getAllCity(req,res){
    try {
        const cities=await CityService.getAllCity();
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"all cities fetched successfully",
            data:cities,
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

async function getCity(req,res){
    try {
        const city=await CityService.getCity(req.params.id);
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"city fetched successfully",
            data:city,
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

async function destroyCity(req,res){
    try {
        const response = await CityService.destroyCity(req.params.id);
        return res.status(StatusCodes.OK).json({
            success:true,
            message:" city deleted successfully",
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

async function updateCity(req,res){
    try {
        const response = await CityService.updateCity(req.params.id,req.body);
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"city updated successfully",
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
    createCity,
    getAllCity,
    getCity,
    destroyCity,
    updateCity
}