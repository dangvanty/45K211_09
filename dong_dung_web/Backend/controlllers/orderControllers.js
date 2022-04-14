const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Create new Order
exports.newOrder = catchAsyncErrors(async(req,res,next)=>{
    const{
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        ShippingPrice,
        totalPrice,
    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        ShippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user:req.user._id,
    });

    res.status(201).json({
        success: true,
        order,
    })

});


// get Single Order
exports.getSingleOrder = catchAsyncErrors(async(rep,res,next)=>({

    const order = await Order.findById(req.params.id).poplate(
        "user",
        "name email");


    if(!order){
        return next(new ErrorHander("Order not found with this Id", 404));
    }

    res.status(200).json({
        success:true,
        order,
    });
});


// get logged in user Orders
exports.myOrders = catchAsyncErrors(async(rep,res,next)=>({

    const orders = await Order.find({user: req.user._id})
        
 

    res.status(200).json({
        success:true,
        order,
    });
});

// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async(rep,res,next)=>({

    const orders = await Order.find();

    let totalAmount=0;

    orders.forEach(order=>{
        totalAmount += order.totalPrice;
    });
        
    res.status(200).json({
        success:true,
        totalAmount,
        order,
    });
});

// get logged in user Orders
exports.myOrders = catchAsyncErrors(async(rep,res,next)=>({

    const orders = await Order.find({user: req.user._id})
        
 

    res.status(200).json({
        success:true,
        order,
    });
});

// update Order Status -- Admin
exports.updateOrders = catchAsyncErrors(async(rep,res,next)=>({

    const order = await Order.findById(req.params.id);
    
    if(!order){
        return next(new ErrorHander("Order not found with this Id", 404));

    if(order.orderStatus==="Delivered"){
        return next(newErrorHander("You have already delivered this order",400));
    }

    order.orderItems.forEach(order=>{
        await updateStock(order.Product,order.quantity);
    });

    order.orderStatus = req.body.status;
    
    if(req.body.status==="Delivered"){
        order.deliveredAt=Data.now()
    }
    
    await order.save({validateBeforeSave: false});
    res.status(200).json({
        success:true,
        totalAmount,
        order,
    });
});

async function updateStock(id,quantity){
    const product = await Product.findById(id);

    product.Stock-=quantity;
    await product.save({validateBeforeSave: false});
}

// delete Orders -- Admin
exports.deleteOrders = catchAsyncErrors(async(rep,res,next)=>({

    const orders = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHander("Order not found with this Id", 404));

    await order.remove()
    res.status(200).json({
        success:true,
     
        
    });
});