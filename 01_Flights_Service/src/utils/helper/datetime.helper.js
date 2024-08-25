function compareTime(ArrivalTimeString,DepartureTimeString){
    let arrivalTime = new Date(ArrivalTimeString);//convert the string into js time format
    let departureTime = new Date(DepartureTimeString);

    return arrivalTime.getTime()> departureTime.getTime();//return true if arrival time is greater than departure time
    //getTime()-->converts the js time format into millisecond
}

module.exports={compareTime}