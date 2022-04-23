import React, { Fragment } from 'react';
import {CgMouse} from "react-icons/all";
import "./Home.css";
import Prouct from "./Product.js"

const product = {
    name: "",
    images: [{url: ""}],
    price: "",
    _id: "",
};

const Home = () => {
  return <Fragment>
      <div className='banner'>
          <p>Welcome to Ecommerce</p>
          <h1>FIND AMAZING PRODUCTS BELOW</h1>

          <a href="#container">
              <button>
                  scroll <CgMouse />
              </button>
          </a>
      </div>

      <h2 className='homeHeading'>Featured Product</h2>

      <div className='container' id = 'container'>
          <Product product = {product} />
          <Product product = {product} />
          <Product product = {product} />
          <Product product = {product} />

          <Product product = {product} />
          <Product product = {product} />
          <Product product = {product} />
          <Product product = {product} />
      </div>
  </Fragment>
}

export default Home