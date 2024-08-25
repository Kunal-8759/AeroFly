
const { StatusCodes } = require('http-status-codes');
const {AirplaneRepository}=require('../repositories');
const AppError = require('../utils/Errors/app.error');

const airplaneRespository=new AirplaneRepository();

// data:{modelNo,capacity}
async function createAirplane(data){
    try {
        const airplane=await airplaneRespository.create(data);
        return airplane;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanantion=[];
            error.errors.forEach((err)=>{
                explanantion.push(err.message);
            })

            throw new AppError(explanantion,StatusCodes.BAD_REQUEST);
        }

        throw new AppError('Cannot create a new Airplane Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllAirplane(){
    try {
        const airplanes=await airplaneRespository.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError('cannot fetch the all airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id){
    try {
        const airplane =await airplaneRespository.get(id);
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('the Airplane you searched is not present',error.statusCode);
        }
        throw new AppError('Cannot able to get the airplane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirplane(id){
    try {
        const response = await airplaneRespository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airplane youn want to destroy is not present',error.statusCode);
        }
        throw new AppError('Cannot able to get the airplane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirplane(id,data){
    try {
        const response = await airplaneRespository.update(id,data);
        return response;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you want to update is not available',StatusCodes.NOT_FOUND);
        }
        if(error.name == 'SequelizeValidationError'){
            let explanantion=[];
            error.errors.forEach((err)=>{
                explanantion.push(err.message);
            })
            throw new AppError(explanantion,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot able to get the airplane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createAirplane,
    getAllAirplane,
    getAirplane,
    destroyAirplane,
    updateAirplane
}