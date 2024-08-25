const { userService } = require("../services");
const {StatusCodes}=require('http-status-codes');

async function signup(req,res){
    try {
        const user=await userService.create({
            email:req.body.email,
            password:req.body.password,
            name : req.body.name
        })

        return res.status(StatusCodes.CREATED).json({
            success:true,
            message:'user registered successfully',
            error:{},
            data:user
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:'user registeration failed',
            error:error,
            data:{}
        });
    }
}

async function signin(req,res){
    try {
        const user=await userService.signin({
            email:req.body.email,
            password:req.body.password
        })

        return res.status(StatusCodes.CREATED).json({
            success:true,
            message:'user registered successfully',
            error:{},
            data:user
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:'user registeration failed',
            error:error,
            data:{}
        });
        
    }
}

async function addRoleToUser(req,res){
    try {
        const user=await userService.addRoleToUser({
            role:req.body.role,
            id : req.body.id
        });
        return res.status(StatusCodes.CREATED).json({
            success:true,
            message:'user registered successfully',
            error:{},
            data:user
        });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:'something went wrong',
            error:error,
            data:{}
        });
    }
}

async function getUserById(req,res){
    try {
        const user = await userService.getUserById(req.params.id);
        return res.status(StatusCodes.OK).json({
            success:true,
            message:'successfully fetched',
            error:{},
            data:user
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            success:false,
            message:'something went wrong',
            error:error,
            data:{}
        });
    }
}

module.exports={
    signup,
    signin,
    addRoleToUser,
    getUserById
}