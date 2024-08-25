const express=require('express');
const { pingController } = require('../../controllers');

const pingRouter=express.Router();

pingRouter.get('/',pingController);

module.exports=pingRouter;
