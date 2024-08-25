
const { StatusCodes } = require('http-status-codes');
const {FlightRepository}=require('../repositories');
const AppError = require('../utils/Errors/app.error');
const { compareTime } = require('../utils/helper/datetime.helper');
const {Op} =require('sequelize');

const flightRespository=new FlightRepository();

// data:{}
async function createFlight(data){
    try {
        if(compareTime(data.arrivalTime,data.departureTime)){  
            const flight=await flightRespository.create(data);
            return flight;
        }
        throw new AppError('TimeConstraintProblem',StatusCodes.BAD_REQUEST);
    } catch (error) {
        console.log(error);
        if(error.message == 'TimeConstraintProblem'){
            throw new AppError('Arrival Time cant be less than Departure Time',StatusCodes.BAD_REQUEST);
        }
        if(error.name == 'SequelizeForeignKeyConstraintError'){
            throw new AppError('The data you given is not present in the associated table',StatusCodes.BAD_REQUEST);
        }
        if(error.name == 'SequelizeValidationError'){
            let explanantion=[];
            error.errors.forEach((err)=>{
                explanantion.push(err.message);
            })
            throw new AppError(explanantion,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Flight Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

//query we got here is object where filters are written
// query:{
//     trips:MUM-DEL,
//     price:minPrice-maxPrice,
//     travellers:2,
//     tripDate:2024-08-05,
//     sort:departureTime_ASC,price_DESC
// }

//we have to give the sort as follows
// sort: [
//     ['departureTime', 'ASC'],
//     ['price', 'DESC'],
// ],


async function getAllFlights(query){
    let customFilter={};
    let sortFilter=[];
    const endDateTime = " 23:59:00";
    const startDateTime = " 00:00:00";

    if(query.trips){
        [departureAirportId,arrivalAirportId]=query.trips.split("-");
        customFilter.departureAirportId=departureAirportId;
        customFilter.arrivalAirportId=arrivalAirportId;
    }

    if(query.price){
        [minPrice,maxPrice]=query.price.split("-");
        customFilter.price={
            [Op.between]:[minPrice,((maxPrice == undefined)? 20000:maxPrice)]
        }
    }
    if(query.travellers){
        customFilter.totalSeats={
            [Op.gte]:query.travellers
        }
    }
    if(query.tripDate){
        console.log(query.tripDate + endDateTime);
        customFilter.departureTime={
            [Op.between]:[query.tripDate + startDateTime ,query.tripDate + endDateTime]
        }
    }
    if(query.sort){
        const params= query.sort.split(',');//params is an array
        const sortFilters = params.map((param)=> param.split('_'));
        sortFilter=sortFilters;
    }

    try {
        const flights=await flightRespository.getAllFlights(customFilter,sortFilter);
        return flights;
    } catch (error) {
        console.log(error);
        if(error.message=='DepartureArrivalSame'){
            throw new AppError('Source and Destination can not be Same',StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id){
    try {
        const flight =await flightRespository.get(id);
        return flight;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('the Flight you searched is not present',error.statusCode);
        }
        throw new AppError('Cannot able to get the Flight',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateRemainingSeat(data){
    try {
        const response = await flightRespository.updateRemainingSeat(data.flightId,data.seats,data.dec);
        return response;
    } catch (error) {
        throw new AppError('Cannot update data of the flight',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createFlight,
    getAllFlights,
    getFlight,
    updateRemainingSeat
    
}