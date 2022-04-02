const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User =require("../models/userModel");
const sendToken=require("../utils/jwtToken")
//Register a User
exports.registerUser=catchAsyncErrors( async(req,res,next)=>{
    const { name, email, password }= req.body;
    const user= await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"gdgdfg",
            url:"dfsfs",
        }, 
    })

    sendToken(user,201,res);
})

// login user
exports.loginUser =catchAsyncErrors(async (req,res,next)=>{
    const {email, password}=req.body;

    //check if user has given password and email both 
    
    if (!email|| !password){
        return next (new ErrorHander("Vui lòng nhập Email và mật khẩu",400))
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
    return next(new ErrorHander("Email hoặc mật khẩu không đúng", 401));
  }

  const isPassMatched=await user.comparePassword(password);
  if(!isPassMatched){
      return next (new ErrorHander("Email hoặc mật khẩu không đúng",401))
  }

sendToken(user,200,res)

})

// logout user

exports.logout=catchAsyncErrors( async (req,res,next)=>{

    res.cookie("token",null,{
        expries: new Date(Date.now()),
        httpOnly:true,
    })
        
    res.status(200).json({
        success: true,
        message:"Logged Out",
    })
})