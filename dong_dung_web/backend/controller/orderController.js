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


// get Single Oder

exports.getSingleOrder = catchAsyncErrors(async (req,res,next)=>{
    const order =await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if(!order){
        return next(new ErrorHander("Đơn hàng không tìm thấy",404));
    }

    res.status(200).json({
        success:true,
        order,
    });
});

//get log in user Order

exports.myOrders=catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      orders,
    });
  });

//get all order from admin

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  });

  // update order status -admin
  exports.updateOrder = catchAsyncErrors(async(req,res,next)=>{
      const order =await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHander("Order không được tìm thấy tại Id này ", 404));
      }

      if (order.orderStatus === "Delivered") {
        return next(new ErrorHander("Đơn hàng đang được Delivered", 400));
      }

      if(req.body.status==="Shipped"){
        order.orderItems.forEach(async (o) => {
            await updateStock(o.product, o.quantity);

        });
      }
      order.orderStatus=req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
      }

      await order.save({ validateBeforeSave: false });
      res.status(200).json({
        success: true,
      });
  })

  async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false });
  }

  //delete order ---admin

  exports.deleteOrder=catchAsyncErrors (async(req,res,next)=>{
      const order=await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHander("Order không được tìm thấy tại Id này ", 404));
      }

      await order.remove();

      res.status(200).json({
        success: true,
      });
  })
