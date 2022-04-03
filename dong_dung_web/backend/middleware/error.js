const ErrorHandler=require('../utils/errorhander');

module.exports=(err, req, res, next)=>{
    err.statusCode=err.statusCode ||500;
    err.message=err.message || "Internal Server Error";

    //wrong mongodb id errors
if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

    //mongoos duplicate key error:
if(err.code === 11000){
    const message = `${Object.keys(err.keyValue)} đã tồn tại, vui lòng nhập khác`;
    err = new ErrorHandler(message, 400);
}

// Wrong JWT error
if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token không có sẵn, Vui lòng thử lại `;
    err = new ErrorHandler(message, 400);
  }
  
// JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token bị hết hạn,Vui lòng thử lại `;
    err = new ErrorHandler(message, 400);
  }


    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    })

}

