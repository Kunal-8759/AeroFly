const express=require('express');
const { AirplaneController } = require('../../controllers');
const { AirplaneMiddleware } = require('../../middlewares');

const airplaneRouter=express.Router();

// api/v1/airplanes POST
airplaneRouter.post('/',AirplaneMiddleware.validateCreateRequest,AirplaneController.createAirplane);

// api/v1/airplanes GET
airplaneRouter.get('/',AirplaneController.getAllAirplane);

// api/v1/airplanes/:id GET
airplaneRouter.get('/:id',AirplaneController.getAirplane);

// api/v1/airplanes/:id DELETE
airplaneRouter.delete('/:id',AirplaneController.destroyAirplane);

// api/v1/airplanes/:id PATCH
airplaneRouter.patch('/:id',AirplaneMiddleware.validateUpdateRequest,AirplaneController.updateAirplane);

module.exports=airplaneRouter;