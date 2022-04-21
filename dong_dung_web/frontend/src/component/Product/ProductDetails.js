import React, { Fragment, useEffect, useState} from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'

import {useSelector,useDispatch} from 'react-redux'
import {getProductDetails,clearErrors, newReview} from '../../actions/productAction'

import MetaData from '../layout/MetaData'
import {useParams} from 'react-router-dom'
import ReviewCard  from './ReviewCard '
import Loader from '../layout/Loader/Loader'
import {useAlert} from 'react-alert'
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import {Rating} from "@material-ui/lab"
import {formatNumber} from './formatPrice'
import { NEW_PRODUCT_RESET } from '../../constants/productContant'
const ProductDetails =()=> {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert =useAlert();
  const { product, loading, error } = useSelector((state) => state.productDetails);
  
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

const [quantity, setQuantity] = useState(1);
const [open, setOpen] = useState(false);
const [rating, setRating] = useState(0);
const [comment, setComment] = useState("");

const increaseQuantity = () => {
  if (product.Stock <= quantity) return;

  const qty = quantity + 1;
  setQuantity(qty);
};

const decreaseQuantity = () => {
  if (1 >= quantity) return;

  const qty = quantity - 1;
  setQuantity(qty);
};

const addToCartHandler = () => {
  dispatch(addItemsToCart(id, quantity));
  alert.success("Thêm vào giỏ hàng thành công!");
};
const submitReviewToggle = () => {
  open ? setOpen(false) : setOpen(true);
};

const reviewSubmitHandler = () => {
  const myForm = new FormData();

  myForm.set("rating", rating);
  myForm.set("comment", comment);
  myForm.set("productId", id);

  dispatch(newReview(myForm));

  setOpen(false);
};

useEffect(() => {
  if(error){
    alert.error(error);
    dispatch(clearErrors())
  }
  
  if (reviewError) {
    alert.error(reviewError);
    dispatch(clearErrors());
  }

  if (success) {
    alert.success("Review Submitted Successfully");
    dispatch({ type: NEW_PRODUCT_RESET });
  }
  dispatch(getProductDetails(id)); 
  

}, [dispatch,id,error,alert, reviewError, success])



  return (
   <Fragment>
     {loading ?(
       <Loader/>
     ):(
      <Fragment>
      <MetaData title={`${product.name} | Đồng Dũng`}/>
        <div className='ProductDetails'>
            <div>
                <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
                </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} lượt đánh giá)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`${formatNumber(product.price)} đ`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button  onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                  onClick={addToCartHandler}
                    disabled={product.Stock < 1 ? true : false}
                    
                  >
                    Thêm vào giỏ
                  </button>
                </div>

                <p>
                  Trạng thái:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? " Bán hết" : " Còn hàng"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Mô tả : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle}
             className="submitReview">
                Gửi đánh giá
              </button>
            </div>
        </div>


        <h3 className="reviewsHeading">Đánh giá sản phẩm</h3>
        <div className='reviewsHeading-line' ></div>

        <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Gửi đánh giá</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Hủy
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Đánh giá
              </Button>
            </DialogActions>
          </Dialog>

        {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">Chưa có đánh giá nào!</p>
          )}
    </Fragment>
     )}

   </Fragment>
  )
}

export default ProductDetails