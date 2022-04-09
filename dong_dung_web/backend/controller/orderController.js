const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const ErrorHander = require("../utils/errorhander");

const catchAsyncErrors = require("../middleware/catchAsyncError");

//create new Order:

exports.CreateNewOrder=catchAsyncErrors(async(req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;
    
      const order= await Order.create({
        shippingInfo,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user: req.user._id,
      })
      res.status(201).json({
          success:true,
          order,
      })
});


