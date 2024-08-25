const express=require('express');
const {userController}=require('../../controllers');
const { validateAuthRequest, checkAuth, isAdmin } = require('../../middlewares/authRequest.middleware');

const userRouter=express.Router();
userRouter.post('/signup',validateAuthRequest,userController.signup);
userRouter.post('/signin',validateAuthRequest,userController.signin);

userRouter.post('/role',checkAuth,isAdmin,userController.addRoleToUser);

userRouter.get('/:id',userController.getUserById);

module.exports=userRouter;