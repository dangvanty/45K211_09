const ErrorHandler = require("../utils/errorhander");


module.exports = (err,req,res,next)=>{

    err.statuscode = err.statuscode || 500;
    err.message = err.message || "Internal Server Error";
    // Wrong Mongodb Id error
    if (err.name==="CastError"){
        const message = 'Resource bot found. Invalid: ${err.path}';
        err=new ErrorHandler(message,400);
    }
    res.status(err.statuscode).json({
        success: false,
        message: err.message ,

    })


}