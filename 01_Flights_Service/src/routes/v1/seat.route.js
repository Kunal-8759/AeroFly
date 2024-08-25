const express=require('express');
const { SeatController } = require('../../controllers');

const seatRouter=express.Router();

// api/v1/seats GET
seatRouter.get('/:id',SeatController.getSeat);

module.exports=seatRouter;