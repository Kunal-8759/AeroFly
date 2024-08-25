const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");

//req.body={flightNumber,airplaneId,departureAirportId,arrivalAirportId,arrivalTime,departureTime,price,boardingGate,totalSeats}
async function createFlight(req,res){
    try {
        const flight= await FlightService.createFlight(req.body);
        return res.status(StatusCodes.CREATED).json({
            success:true,
            message:"flight created successfully",
            data:flight,
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

async function getAllFlights(req,res){
    try {
        const flights = await FlightService.getAllFlights(req.query);
        return res.status(StatusCodes.CREATED).json({
            success:true,
            message:"flight fetched successfully",
            data:flights,
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

async function getFlight(req,res){
    try {
        const flight=await FlightService.getFlight(req.params.id);
        return res.status(StatusCodes.OK).json({
            success:true,
            message:" flight fetched successfully",
            data:flight,
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

async function updateRemainingSeat(req,res){
    try {
        const response = await FlightService.updateRemainingSeat({
            flightId:req.params.id,
            seats:req.body.seats,
            dec:req.body.dec
        });
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"updated the seats Successfully",
            data:response,
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


module.exports={
    createFlight,
    getAllFlights,
    getFlight,
    updateRemainingSeat
}