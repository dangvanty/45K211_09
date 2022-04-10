import React,{Fragment} from 'react'
import {CgMouse}from "react-icons/all"
import { Button } from '../layout/Button/Button'; 
import "./Home.css"
import Product from "./Product.js"

const product={
  name:"Bộ bàn ghế 5 món",
  images:[{url:"https://noithatminhkhoi.com/upload/sanpham/large/37-salon-go-trien-xoan-dao-tay-10-6-mon-sl223.jpg"}],
  price: "1.000.000 đ",
  _id:"kjfldfjdl"
}
function Home() {


  return <Fragment>
           <title>Đồng Dũng| Trang chủ</title>
            <div className="banner">
                <p>Đặt hàng, mua hàng nhanh chóng trên Website</p>
                <h1>TÌM SẢN PHẨM MÀ BẠN CẦN DƯỚI ĐÂY!</h1>
                <a href="#container">
                <Button buttonStyle='btn--outline'>Scroll<CgMouse/></Button>
                </a>
               
            </div>

            <h2 className='homeHeading'> Sản phẩm của Đồng Dũng
            </h2>

            <div className='container' id='container'>
              <Product product={product}/>
              <Product product={product}/>
              <Product product={product}/>
              <Product product={product}/>
              <Product product={product}/>
              <Product product={product}/>
            </div>
  </Fragment>
}

export default Home;