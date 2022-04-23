import {createStore, combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { newReviewReducer, 
    productDetailsReducer, 
    productsReducer, 
    productReducer, 
    newProductReducer,
    reviewReducer,
    productReviewsReducer} from './reducers/productReducer';
import{userReducer, profileReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer} from'./reducers/userReducer'
import { cartReducer } from './reducers/cartReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer,orderReducerUser } from './reducers/orderReducer';
const reducer= combineReducers({
    
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview:newReviewReducer,
    product: productReducer,
    allOrders: allOrdersReducer ,
    allUsers:allUsersReducer,
    newProduct: newProductReducer ,
    order: orderReducer,
    orderUser:orderReducerUser,
    userDetails: userDetailsReducer ,
    review: reviewReducer,
    productReviews: productReviewsReducer,

})

let initialState={
    cart:{
        cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    }

}
const middleware =[thunk]

const store =createStore(
reducer,
initialState,
composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

