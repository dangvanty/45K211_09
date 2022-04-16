import React, { Fragment, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'

import {useSelector,useDispatch} from 'react-redux'
import {getProductDetails,clearErrors} from '../../actions/productAction'
import ReactStars from 'react-rating-stars-component'
import MetaData from '../layout/MetaData'
import {useParams} from 'react-router-dom'
import ReviewCard  from './ReviewCard .js'
import Loader from '../layout/Loader/Loader'
import {useAlert} from 'react-alert'

const ProductDetails =()=> {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert =useAlert();
  const {  product, loading, error } = useSelector((state) => state.productDetails);
  

  useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors())
      }
      dispatch(getProductDetails(id)); 

  
  }, [dispatch,product,error,alert])
  
const options={
    edit:false,
    color: 'red',
    activeColor:"tomato",
    size:window.innerWidth<600?15:10,
    value:product.ratings,
    isHalf:true,
}
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
                <ReactStars {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`${product.price} đ`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input readOnly type="number" value='1' />
                    <button >+</button>
                  </div>
                  <button
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

              <button 
             className="submitReview">
                Gửi đánh giá
              </button>
            </div>
        </div>


        <h3 className="reviewsHeading">REVIEWS</h3>
        <div className='reviewsHeading-line' ></div>


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