const mongoose = require("mongoose");


const oderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: Srting,
            require: true 
        },
        city: {
            type: Srting, 
            require: true 
        },

        state: {
            type: Srting,
            require: true 
        },

        country: {
            type: Srting, 
            require: true 
        },
        pinCode: {
            type: Number,
            require: true,
        },
        phoneNo: {
            type: Number,
            require: true,
        },
    },
    orderItems:[
        {
            name:{
                type: String,
                require: true,
            },
            price:{
                type: Number,
                require: true,
            },
            quantity:{
                type: Number,
                require: true,
            },
            image:{
                type: String,
                require: true,
            },
            product:{
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                require: true,

            },

        }
    ]
    user:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        require: true,
    },
    paymentInfo:{
        id: {
            type: String,
                require: true,
        },
        status: {
            type: String,
                require: true,
        }
    },
    paidAt:{
        type: Data,
        required: true,
    },
    itemsPrice:{
        type:Number,
        default:0
    },
    taxPrice:{
        type:Number,
        default:0
    },
    shippingPrice:{
        type:Number,
        default:0
    },
    totalPrice:{
        type:Number,
        default:0
    },
    orderStatus:{
        type:String,
        require: true,
        default:"processing"
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },

});


module.exports = mongoose.model("Order",orderSchema)