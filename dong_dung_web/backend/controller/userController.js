const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User =require("../models/userModel");
const sendToken=require("../utils/jwtToken");
const crypto = require("crypto");
const sendEmail=require("../utils/sendEmail");
const cloudinary =require("cloudinary")
//Register a User
exports.registerUser=catchAsyncErrors( async(req,res,next)=>{
// const file = req.body.avatar
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
    public_id: `${Date.now()}`,
    resource_type: "auto",
  });

    const { name, email, password }= req.body;
    const user= await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
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

//Forgot Password
exports.forgotPassword= catchAsyncErrors(async(req,res,next)=>{
    const user =await User.findOne({email: req.body.email});

    if(!user){
        return next(new ErrorHander("Không tìm thấy User",404));
    }

    // Get ResetPassword Token

    const resetToken =user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl=`${req.protocol}://${req.get(
        "host"
      )}/api/v1/password/reset/${resetToken}`;

    const message =`Token reset mật khẩu của bạn là:- \n\n ${resetPasswordUrl} \n\n Nếu bạn không cần email này thì vui lòng bỏ qua nó.`;

    try{
        await sendEmail({
            email: user.email,
            subject: `Khôi phục mật khẩu tài khoản ở Đồng Dũng website`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email đã được gửi tới ${user.email} thành công`,
        });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return next(new ErrorHander(error.message, 500));
    }

})

//reset password:

exports.resetPassword= catchAsyncErrors(async(req,res,next)=>{
    //creating token hash
    const resetPasswordToken=crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user =await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    })

    if(!user){
        return next(
            new ErrorHander(
              "Token mật khẩu khôi phục không có sẵn hoặc đã bị hết hạn",
              400
            )
          );
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHander("Mật khẩu xác nhận không phải", 400));
    }

    await user.save();

    sendToken(user, 200, res);
})

//get user detail
exports.getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    })
})

//update User password:

exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user =await await User.findById(req.user.id).select("+password");

    const isPassMatched =await user.comparePassword(req.body.oldPassword);

    if(!isPassMatched){
        return next(new ErrorHander("Mật khẩu cũ không chính xác",400));
    }

    if(req.body.newPassword !==req.body.confirmPassword){
        return next (new ErrorHander("Mật khẩu không giống nhau",400))
    }

    user.password=req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);

})

//update User profile

exports.updateUserProfile=catchAsyncErrors(async(req,res,next)=>{
    const newUserProfile={
        name: req.body.name,
        email: req.body.email,
    }

    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);

      const imageId = user.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",

      });

      newUserProfile.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }


    const user=await User.findByIdAndUpdate(req.user.id,newUserProfile,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })

    res.status(200).json({
        success: true,
      });
})

//get all user -- admin
exports.getAllUser=catchAsyncErrors(async(req,res,next)=>{
    const users =await User.find();

    res.status(200).json({
        success: true,
        users,
    });
})

//get single user --admin
exports.getSingleUser =catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.params.id);

    if(!user){
        return next(
            new ErrorHander(`User không tồn tại với ID: ${req.params.id}`)
        )
    }

    res.status(200).json({
        success:true,
        user,
    })
})

//update User role (admin)

exports.updateUserRole=catchAsyncErrors(async(req,res,next)=>{
    const newUserProfile={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    }

    await User.findByIdAndUpdate(req.params.id,newUserProfile,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })

    res.status(200).json({
        success:true,
    })
})

// delete User --admin:
exports.deleteUser=catchAsyncErrors(async(req,res,next)=>{
    const user =await User.findById(req.params.id);

    if(!user){
        return next(
            new ErrorHander(`User không tồn tại với ID: ${req.params.id}`,400)
        )
    }
    await user.remove();
    res.status(200).json({
        success:true,
        message:"Bạn đã xóa User thành công"
    })
})
