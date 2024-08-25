const {StatusCodes}=require('http-status-codes');

async function pingController(req,res){
    return res.status(StatusCodes.OK).json({
        success:true,
        message:'api is live',
        error:{},
        data:{}
    })
}

module.exports={
    pingController
}