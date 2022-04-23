const Product =require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const cloudinary = require("cloudinary");
const ApiFeatures = require("../utils/apifeature")
//Created Product--Admin
exports.createProduct= catchAsyncErrors(async(req,res,next)=> {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

    const product =await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})
// get admin products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});
// get all product
exports.getAllProducts = catchAsyncErrors(async (req,res, next )=>{
        // return next(new ErrorHander("trang bị lỗi",500))
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

            // Images Start Here
            let images = [];

            if (typeof req.body.images === "string") {
              images.push(req.body.images);
            } else {
              images = req.body.images;
            }

            if (images !== undefined) {
              // Deleting Images From Cloudinary
              for (let i = 0; i < product.images.length; i++) {
                await cloudinary.v2.uploader.destroy(product.images[i].public_id);
              }

              const imagesLinks = [];

              for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                  folder: "products",
                });

                imagesLinks.push({
                  public_id: result.public_id,
                  url: result.secure_url,
                });
              }

              req.body.images = imagesLinks;
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
            // Deleting Images From Cloudinary
            for (let i = 0; i < product.images.length; i++) {
              await cloudinary.v2.uploader.destroy(product.images[i].public_id);
            }
        await product.remove();

        res.status(200).json({
            success:true,
            message:"Xóa sản phẩm thành công",
            product
        })
    }
)

// Create new review or update the review

exports.createProductReview=catchAsyncErrors(async(req,res,next)=>{
    const {rating, comment, productId}=req.body;

    const review ={
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product =await Product.findById(productId);

    const isReviewed = product.reviews.find((rev)=>
        rev.user.toString()=== req.user._id.toString());

    if(isReviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString()===req.user._id.toString())
            (rev.rating = rating), (rev.comment = comment);
        })
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg =0;

    product.reviews.forEach((rev)=>{
        avg += rev.rating;
    })

    product.ratings =avg / product.reviews.length;

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success:true,
    });
});

//get all reviews of a product
exports.getAllProcductReviews= catchAsyncErrors(async(req,res,next)=>{

    const product =await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHander("Sản phẩm không được tìm thấy",404));
    }

    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
})

//delete review
exports.deteteReview =catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return next(new ErrorHander("Sản phẩm không được tìm thấy", 404));
    }

    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
      avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
    });
})
