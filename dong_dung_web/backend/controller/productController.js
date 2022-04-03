const Product =require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");

const ApiFeatures = require("../utils/apifeature")
//Created Product--Admin
exports.createProduct= catchAsyncErrors(async(req,res,next)=> {
    req.body.user=req.user.id;
    const products =await Product.create(req.body);
    res.status(201).json({
        success:true,
        products
    })   
})

// get all product 
exports.getAllProducts = catchAsyncErrors(async (req,res, next )=>{
        const resultPerPage=8;
        const productsCount=await Product.countDocuments();

        const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter();
    
        let products = await apiFeature.query;
        
        let filteredProductsCount = products.length;
        
        apiFeature.pagination(resultPerPage);
        
        products = await apiFeature.query;
        res.status(200).json({
            success:true,
            products,
            productsCount,
            resultPerPage,
            filteredProductsCount
        })
    }
)

//get product details
exports.getProductDetails =catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id)

        if(!product){
            return next(new ErrorHander("Không tìm thấy sản phẩm nào",404))
        }
    
    
    
    res.status(200).json({
        success:true,
        product,
        
    })
}
)

//update product -- admin
exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
        let product = await Product.findById(req.params.id)
          if(!product){
                return next(new ErrorHander("Không tìm thấy sản phẩm nào",404))
            } 
    
        product = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true, 
            useFindAndModify:false
        })
        res.status(200).json({
            success:true,
            product
        })
    }
)

//delete product

exports.deleteProduct= catchAsyncErrors(async (req,res,next)=>{
        const product = await Product.findById(req.params.id)
         if(!product){
                return next(new ErrorHander("Không tìm thấy sản phẩm nào",404))
            }
            
        await product.remove();
    
        res.status(200).json({
            success:true,
            message:"Xóa sản phẩm thành công",
            product
        })
    }    
)
