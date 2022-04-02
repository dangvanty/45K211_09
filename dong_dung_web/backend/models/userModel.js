const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Vui lòng nhập tên của bạn"],
        maxLength:[30,"Tên không vượt quá 30 ký tự"],
        minLength:[4,"Tên không ít hơn 4 ký tự"],
    },
    email: {
        type:String,
        required:[true,"Vui lòng nhập email của bạn"],
        unique:true,
        validate:[validator.isEmail,"Vui lòng nhập chính xác email"],
    },
    password:{
        type:String,
        required:[true,"Vui lòng nhập mật khẩu của bạn"],
        minLength:[8,"Mật khẩu không được nhỏ hơn 8 ký tự"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        },
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
   
})

//hash password:
userSchema.pre("save",async function(next){
    if (!this.isModified("password")) {
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
})

// JWT token 
userSchema.methods.getJWTToken =function(){
    return jwt.sign({id:this._id},
        process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRE,
        })
}

// compare Password
userSchema.methods.comparePassword =async function(password){
    return await bcrypt.compare(password, this.password)
}
module.exports=mongoose.model("User",userSchema)