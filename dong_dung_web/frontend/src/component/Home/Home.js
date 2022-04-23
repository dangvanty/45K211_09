import React,{Fragment, useEffect, useState} from 'react'
import {CgMouse}from "react-icons/all"
import { Button } from '../layout/Button/Button'; 
import "./Home.css"
import ProductCard from "./ProductCard.js"
import MetaData from "../layout/MetaData"
import {getProduct,clearErrors} from '../../actions/productAction'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../layout/Loader/Loader';
import {useAlert} from 'react-alert'
import Pagination from "react-js-pagination";
import {Link} from "react-router-dom"
import LaunchIcon from "@material-ui/icons/Launch";
import Footer from "../layout/Footer/Footer"
function Home() {
  
  const alert = useAlert();
  const dispatch =useDispatch();
  const {loading, error, products,productsCount,resultPerPage,filteredProductsCount} = useSelector(
    (state) => state.products
  )
  let count =filteredProductsCount;
  const [currentPage, setCurrentPage] = useState(1)
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
 

  useEffect(()=>{
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  
    dispatch(getProduct())
  }, [dispatch,currentPage,alert,error])
  return (
    <Fragment>
      {loading ? (<Loader/>):( 
        
        <Fragment>
          
          <MetaData title="Đồng Dũng| Trang chủ"/>
          <div className="banner">
              <p>Đặt hàng, mua hàng nhanh chóng trên Website</p>
              <h1>TÌM SẢN PHẨM MÀ BẠN CẦN DƯỚI ĐÂY!</h1>
              <a href="#container">
              <Button buttonStyle='btn--outline'>Khám phá<CgMouse/></Button>
              </a>
              
          </div>

         <Link to="/products"> <h2 className='homeHeading'> Sản phẩm của Đồng Dũng    <LaunchIcon/>
          <div className='homeHeading-line' ></div>
          </h2></Link> 

          <div className='container' id='container'>
            {products && products.map((product)=>(
                <ProductCard product={product}/>
            ))}
          </div>
          {resultPerPage < count && (    
            <div className='paginationBox'>
                <Pagination 
                     activePage={currentPage}
                     itemsCountPerPage={resultPerPage}
                     totalItemsCount={productsCount}
                     onChange={setCurrentPageNo}
                     nextPageText=">>"
                     prevPageText="<<"
                     firstPageText="1"
                     lastPageText="Trang cuối"
                     itemClass="page-item"
                     linkClass="page-link"
                     activeClass="pageItemActive"
                     activeLinkClass="pageLinkActive"
                />
            </div>)}
        </Fragment>
       
      )}
       <Footer/>
    </Fragment>
    
  )
}

export default Home;