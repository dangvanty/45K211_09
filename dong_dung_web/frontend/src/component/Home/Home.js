import React,{Fragment, useEffect} from 'react'
import {CgMouse}from "react-icons/all"
import { Button } from '../layout/Button/Button'; 
import "./Home.css"
import ProductCard from "./ProductCard.js"
import MetaData from "../layout/MetaData"
import {getProduct,clearErrors} from '../../actions/productAction'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../layout/Loader/Loader';
import {useAlert} from 'react-alert'

function Home() {
  const alert = useAlert();
  const dispatch =useDispatch();
  const {loading, error, products,productsCount} = useSelector(
    (state) => state.products
  )


  useEffect(()=>{
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  dispatch(getProduct())
  },[dispatch,error,alert])
  return (
    <Fragment>
      {loading ? (<Loader/>):(
        <Fragment>
          <MetaData title="Đồng Dũng| Trang chủ"/>
          <div className="banner">
              <p>Đặt hàng, mua hàng nhanh chóng trên Website</p>
              <h1>TÌM SẢN PHẨM MÀ BẠN CẦN DƯỚI ĐÂY!</h1>
              <a href="#container">
              <Button buttonStyle='btn--outline'>Scroll<CgMouse/></Button>
              </a>
              
          </div>

          <h2 className='homeHeading'> Sản phẩm của Đồng Dũng
          <div className='homeHeading-line' ></div>
          </h2>

          <div className='container' id='container'>
            {products && products.map((product)=>(
                <ProductCard product={product}/>
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Home;