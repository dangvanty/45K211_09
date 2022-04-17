import axios from'axios'
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERRORS,

} from '../constants/productContant'
// get all products
export const getProduct=(keyword="",currentPage=1, price=0,category,ratings=0)=>async (dispatch)=>{
    try{
        dispatch({
            type:ALL_PRODUCT_REQUEST
        });

        let link =`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price}&ratings[gte]=${ratings}`;

        if (category) {
          link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price}&category=${category}&ratings[gte]=${ratings}`;
        }
  
        const {data}= await axios.get(link)
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data,
        })
    }
    catch(error){
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};
// Get product Details
export const getProductDetails = (id) => async (dispatch) => {
    try {
      
      
      dispatch({ 
        type: PRODUCT_DETAILS_REQUEST 
      });
      const { data } = await axios.get(`/api/v1/product/${id}`);
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }

};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  