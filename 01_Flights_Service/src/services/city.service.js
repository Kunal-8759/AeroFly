
const { StatusCodes } = require('http-status-codes');
const {CityRepository}=require('../repositories');
const AppError = require('../utils/Errors/app.error');

const cityRespository=new CityRepository();

// data:{name:'London'}
async function createCity(data){
    try {
        const city=await cityRespository.create(data);
        return city;
    } catch (error) {
        console.log(error);
        if(error.name == 'SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError'){
            let explanantion=[];
            error.errors.forEach((err)=>{
                explanantion.push(err.message);
            })
            throw new AppError(explanantion,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new City Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function getAllCity(){
    try {
        const city=await cityRespository.getAll();
        return city;
    } catch (error) {
        throw new AppError('cannot fetch the all city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCity(id){
    try {
        const city =await cityRespository.get(id);
        return city;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('the City you searched is not present',error.statusCode);
        }
        throw new AppError('Cannot able to get the City',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id){
    try {
        const response = await cityRespository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The city you want to destroy is not present',error.statusCode);
        }
        throw new AppError('Cannot able to get the city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id,data){
    try {
        const response = await cityRespository.update(id,data);
        return response;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The city you want to update is not available',StatusCodes.NOT_FOUND);
        }
        if(error.name == 'SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError'){
            let explanantion=[];
            error.errors.forEach((err)=>{
                explanantion.push(err.message);
            })
            throw new AppError(explanantion,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot able to get the city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports={
    createCity,
    getAllCity,
    getCity,
    destroyCity,
    updateCity
}