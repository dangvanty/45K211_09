import React from 'react';
import { link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const options = {
    edit: false,
    color: 'rgba(20, 20, 20, 0.1)',
    activeColor: 'tomato',
    size: window.innerWidth < 600 ? 20 : 25,
    value: 2.5,
    isHaft: true,
};

const Product = () => {
  return (
      <Link className = 'productCard' to = {product._id}>
          <img scr = {product.image[0].url} alt = {product.name} />
          <p>{product.name}</p>
          <div>
              <ReactStars {...options} /> <span>(256 Review)</span>
          </div>
          <span>{product.price}</span>
      </Link>
  )
}

export default Product