const { StatusCodes } = require('http-status-codes');
const {UserRepository , RoleRepository}=require('../repositories');
const AppError = require('../utils/errors/app.error');
const { checkPassword, createToken, verifyToken } = require('../utils/auth');
const {USER_ROLES_ENUMS} = require('../utils/common/enum');
const {ADMIN,CUSTOMER,FLIGHT_COMPANY} = USER_ROLES_ENUMS;

const userRepo=new UserRepository();
const roleRepo = new RoleRepository();



//this is for signup process
//data :{email ,password}
async function create(data){
    try {
        const user =await userRepo.create(data);//create the entry in the User table and gives the return the same data
        const role = await roleRepo.getRoleByName(CUSTOMER);//it will fetch the customer role from the Role Model
        user.addRole(role);//it will add entry and create many-to-many assoc in the User_Roles with the given userId and RoleId

        return user;
    } catch (error) {
        console.log(error);
    }
}


async function signin(data){
    try {
        const user=await userRepo.getUserBYEmail(data.email);
        if(!user){
            throw new AppError('No user found with the given email',StatusCodes.NOT_FOUND);
        }
        const passwordMatch=checkPassword(data.password,user.password);
        if(!passwordMatch){
            throw new AppError('Invalid Password',StatusCodes.BAD_REQUEST);
        }
        const jwt=createToken({id:user.id,email:user.email});

        return jwt;
    } catch (error) {
        if(error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('something went wrong ',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isAuthenticated(token){
    try {
        if(!token){
            throw new AppError('Missing JWT token',StatusCodes.BAD_REQUEST);
        }
        const response = verifyToken(token);//as we create the token using {id,email} so in respnse we get the same
        
        //lets say once user is signedIn but then they delete their profile and then they are again want to access the api 
        //using the same token then we have to handle this case
        const user=await userRepo.get(response.id);
        if(!user){
            throw new AppError('User Not Found',StatusCodes.NOT_FOUND);
        }

        return user.id;
    } catch (error) {
        if(error instanceof AppError) throw error;
        if(error.name == 'JsonWebTokenError'){
            throw new AppError('Invalid JWT token',StatusCodes.BAD_REQUEST);
        }
        if(error.name=='TokenExpiredError'){
            throw new AppError('JWT token Expired',StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Something Went Wrong',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// data : {
//     id,
//     role
// }
async function addRoleToUser(data){
    try {
        const user = await userRepo.get(data.id);
        if(!user) {
            throw new AppError('No user found for the given id', StatusCodes.NOT_FOUND);
        }
        const role = await roleRepo.getRoleByName(data.role);
        if(!role) {
            throw new AppError('No user found for the given role', StatusCodes.NOT_FOUND);
        }
        user.addRole(role);
        return user;
    } catch (error) {
        if(error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isAdmin(id){
    try {
        const user = await userRepo.get(id);
        if(!user) {
            throw new AppError('No user found for the given id', StatusCodes.NOT_FOUND);
        }
        const adminrole = await roleRepo.getRoleByName(ADMIN);
        if(!adminrole) {
            throw new AppError('No user found for the given role', StatusCodes.NOT_FOUND);
        }
        return user.hasRole(adminrole);//return true of false if the given user is admin
    } catch (error) {
        if(error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function getUserById(id){
    try {
        const user = await userRepo.get(id);
        return user;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('the user you searched is not present',error.statusCode);
        }
        throw new AppError('something went wrong ',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    create,
    signin,
    isAuthenticated,
    addRoleToUser,
    isAdmin,
    getUserById
}