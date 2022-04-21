import React from 'react'
import {Link} from 'react-router-dom'
import { Rating } from "@material-ui/lab";
import {formatNumber} from "../Product/formatPrice"

const ProductCard = ({product}) => {
  const options={
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    size:`${window.innerWidth <600 ?15 : 20}`,
}

  return (
    <Link className='productCard' to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name}/>
        <p>{product.name}</p>{" "} <span className='productCardSpan'>({product.numOfReviews} đánh giá)</span>
        <div>
           <Rating {...options }/>{" "}
            
        </div>
        <span>{`${formatNumber(product.price)} đ`}</span>
    </Link>
  )
}

export default ProductCard