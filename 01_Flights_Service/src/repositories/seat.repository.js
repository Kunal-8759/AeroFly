const CrudRepository = require("./crud.repository");
const {Seat} = require('../models');

class SeatRepository extends CrudRepository{
    constructor(){
        super(Seat);
    }
}

module.exports=SeatRepository;