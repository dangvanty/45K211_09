import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERRORS,

} from '../constants/productContant'


export const productReducer=(state={products:[]},action)=>{
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            
           return{
               loading:true,
               products:[]
           };
        case ALL_PRODUCT_SUCCESS:
            
            return{
                loading:false,
                products: action.payload.products,
                productCount: action.payload.productsCount,

            };

        case ALL_PRODUCT_FAIL:
            
            return{
                loading:false,
                error: action.payload,
                };

        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }
        default:
            return state;
    }
}


export const productDetailsReducer=(state= {product:{},loading:true },action)=>{
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
           return{
               loading:true,
               ...state,
               error:""
           };

        case PRODUCT_DETAILS_SUCCESS:
            return{
                ...state,
                loading:false,
                product: action.payload,

            };

        case PRODUCT_DETAILS_FAIL:
            
            return{
                ...state,
                loading:false,
                error: action.payload,
                };

        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }
        default:
            return state;
    }
};