const express=require('express');
const airplaneRouter = require('./airplane.route');
const cityRouter = require('./city.route');
const airportRouter = require('./airport.route');
const flightRouter = require('./flight.route');
const seatRouter = require('./seat.route');

const v1Router=express.Router();

v1Router.use('/airplanes',airplaneRouter);
v1Router.use('/cities',cityRouter);
v1Router.use('/airports',airportRouter);
v1Router.use('/flights',flightRouter);
v1Router.use('/seats',seatRouter);

module.exports=v1Router;