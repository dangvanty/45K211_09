import React, { Fragment, useEffect,useState } from 'react';
import './Product.css';
import {clearErrors,getProduct} from '../../actions/productAction';
import {useSelector,useDispatch} from 'react-redux';
import Loader from "../layout/Loader/Loader";
import ProductCard from '../Home/ProductCard';
import MetaData from '../layout/MetaData';
import {useParams, Link} from 'react-router-dom';
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import {FaSearch} from "react-icons/fa"
import Box from '@material-ui/core/Box';
import Input from "@material-ui/core/Input";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import {styled} from"@material-ui/core/styles"
import Footer from "../layout/Footer/Footer"

const categories=[
    "Nội thất phòng khách",
    "Nội thất phòng ngủ",
    "Nội thất phòng thờ",
    "Đồ gỗ mỹ nghệ"
]
const Product = () => {
    const {keyword} =useParams();
    const dispatch =useDispatch();
    const alert = useAlert();
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 1000]);
    
   
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
      };
    const priceHandler=(event,newPrice)=>{
        setPrice(newPrice);
    }
    const handlerReturn=()=>{
        setPrice([0,1000]);
        setRatings(0);
        setCategory("");
        setCurrentPage(1)
        setName("")
    }
    const [name, setName] = useState("")
    const [name1, setName1] = useState("")
   
    const buttonSerchName = () => {
        setName(name1);
      };
    const nameInputChange = (event) => {
        setName1(event.target.value === '' ? '' : String(event.target.value));
      };
   
    const {products, loading, error, productsCount,resultPerPage,filteredProductsCount}= useSelector(state=>state.products)
    let count =filteredProductsCount;
    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
          }

     dispatch(getProduct(keyword, currentPage,price,category,ratings,name))
    }, [dispatch,keyword,currentPage,price,category,ratings,alert,error,name])
    
  return (
    <Fragment>
        {loading ? (<Loader />):(
            <Fragment>
                <MetaData title="Sản phẩm của Đồng Dũng"/>
               <Link onClick={handlerReturn} className='productsHeadingLink' to="/products"><h2 className='productsHeading'> Sản phẩm của Đồng Dũng 
                    <div className='productsHeading-line' ></div>
                </h2>
                </Link>
            <div className="products">
                {products &&
                products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
            
            <div className='filterBox'>
                
            <fieldset>
               <Typography component="legend">Tìm kiếm <FaSearch style={{color :"#EAB543", cursor:"pointer"}} onClick={buttonSerchName} /></Typography>
                    <Box component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: 'auto' },
                        }}
                        noValidate
                        autoComplete="off">
                        <span>
                        <Input
                            id="component-helper"
                            value={name1}
                            onChange={nameInputChange}
                            aria-describedby="component-helper-text"
                            placeholder='tên sản phẩm'
                            />
                            
                            
                        </span>
                       
                    
                    </Box>    
            </fieldset>      
            <fieldset>
               <Typography component="legend">Giá <small style={{fontSize:10, color:"tomato"}}>(đvt: triệu đồng)</small>:</Typography>
                                       
               <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={1000}
            />
            </fieldset>      
               
               <fieldset>
                <Typography component="legend">Sản phẩm</Typography>
                <ul className="categoryBox">
                {categories.map((category) => (
                    <li className="category-link"
                        key={category}
                        onClick={() => setCategory(category)}
                    >
                        {category}
                    </li>
                ))}
                </ul>
                </fieldset>
                <fieldset>
                <Typography component="legend">Đánh giá</Typography>
                <Slider
                    value={ratings}
                    onChange={(e, newRating) => {
                    setRatings(newRating);
                    }}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                />
                 </fieldset>
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

export default Product