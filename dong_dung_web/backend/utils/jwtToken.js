//tao token va luu trong cookie
const sendToken =(user,statuscode, res)=>{
    const token = user.getJWTToken();

    //options for cookie:
    const options={
        expries:new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly:true,
    };

    res.status(statuscode).cookie("token",token,options).json({
        success:true,
        user,
        token,
    });
};

module.exports=sendToken;