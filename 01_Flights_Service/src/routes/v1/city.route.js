const express=require('express');
const { CityController } = require('../../controllers');
const { CityMiddleware } = require('../../middlewares');

const cityRouter=express.Router();

// api/v1/cities POST
cityRouter.post('/',CityMiddleware.validateCreateRequest,CityController.createCity);

// api/v1/cities GET
cityRouter.get('/',CityController.getAllCity);

// api/v1/cities/:id GET
cityRouter.get('/:id',CityController.getCity);

// api/v1/cities/:id DELETE
cityRouter.delete('/:id',CityController.destroyCity);

// api/v1/cities/:id PATCH
cityRouter.patch('/:id',CityMiddleware.validateUpdateRequest,CityController.updateCity);

module.exports=cityRouter;