function addRowLockOnFlights(flightId){
    return `SELECT * from Flights WHERE Flights.Id = ${flightId} FOR UPDATE;`
}

module.exports={
    addRowLockOnFlights
}