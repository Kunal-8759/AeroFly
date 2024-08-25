
const { StatusCodes } = require('http-status-codes');
const {AirportRepository}=require('../repositories');
const AppError = require('../utils/Errors/app.error');

const airportRespository=new AirportRepository();

// data:{name,code,adress,cityId}
async function createAirport(data){
    try {
        const airport=await airportRespository.create(data);
        return airport;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanantion=[];
            error.errors.forEach((err)=>{
                explanantion.push(err.message);
            })

            throw new AppError(explanantion,StatusCodes.BAD_REQUEST);
        }

        throw new AppError('Cannot create a new Airport Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllAirport(){
    try {
        const airports=await airportRespository.getAll();
        return airports;
    } catch (error) {
        throw new AppError('cannot fetch the all airports',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id){
    try {
        const airport =await airportRespository.get(id);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('the Airport you searched is not present',error.statusCode);
        }
        throw new AppError('Cannot able to get the Airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id){
    try {
        const response = await airportRespository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airport youn want to destroy is not present',error.statusCode);
        }
        throw new AppError('Cannot able to get the airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(id,data){
    try {
        const response = await airportRespository.update(id,data);
        return response;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airport you want to update is not available',StatusCodes.NOT_FOUND);
        }
        if(error.name == 'SequelizeValidationError'){
            let explanantion=[];
            error.errors.forEach((err)=>{
                explanantion.push(err.message);
            })
            throw new AppError(explanantion,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot able to get the airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createAirport,
    getAllAirport,
    getAirport,
    destroyAirport,
    updateAirport
}