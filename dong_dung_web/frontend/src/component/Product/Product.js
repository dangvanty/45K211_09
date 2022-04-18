import React, { Fragment, useEffect,useState } from 'react';
import './Product.css';
import {clearErrors,getProduct} from '../../actions/productAction';
import {useSelector,useDispatch} from 'react-redux';
import Loader from "../layout/Loader/Loader";
import ProductCard from '../Home/ProductCard';
import MetaData from '../layout/MetaData';
import {useParams} from 'react-router-dom';
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import MuiInput from "@material-ui/core/Input";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import {styled} from"@material-ui/core/styles"
import {FaSearch} from "react-icons/fa"
const Input = styled(MuiInput)`
  width: 42px;
`;
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
    const [price, setPrice] = useState(0);
    const [price1, setPrice1] = useState(0);
    // const [price, setPrice] = useState([0,1000000000])
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
      };

    // const priceHandler=(event,newPrice)=>{
    //     setPrice(newPrice);
    // }

    const priceSliderChange = (event, newPrice) => {
        setPrice(newPrice);
      };
    const buttonSliderChange = () => {
        setPrice(price1);
      };
    const priceInputChange = (event) => {
        setPrice1(event.target.value === '' ? '' : Number(event.target.value));
      };
   
    const {products, loading, error, productsCount,resultPerPage,filteredProductsCount}= useSelector(state=>state.products)
    let count =filteredProductsCount;
    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
          }

     dispatch(getProduct(keyword, currentPage,price,category,ratings))
    }, [dispatch,keyword,currentPage,price,category,ratings,alert,error])
    
  return (
    <Fragment>
        {loading ? (<Loader />):(
            <Fragment>
                <MetaData title="Sản phẩm của Đồng Dũng"/>
                <h2 className='productsHeading'> Sản phẩm của Đồng Dũng
                    <div className='productsHeading-line' ></div>
                </h2>
            <div className="products">
                {products &&
                products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
            
            <div className='filterBox'>
                
            <fieldset>
               <Typography component="legend">Giá <small>(đvt: vnđ)</small>:</Typography>
                                       
                    <Input
                        value={price1}
                        size="small"
                        onChange={priceInputChange}
                        inputProps={{
                        
                        min: 0,
                        max: 500000000,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                        }}
                    />
                    <FaSearch style={{color:"#EAB543", fontSize:"20px", cursor:"pointer"}} onClick={buttonSliderChange}/>
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
    </Fragment>
  )
}

export default Product