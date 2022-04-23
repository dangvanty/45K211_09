import './App.css';

import Header from "./component/layout/Header/Header.js"
import {BrowserRouter as Router ,Routes, Route, } from "react-router-dom"

import WebFont from "webfontloader"
import {useEffect} from "react"
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home";
import ProductDetails from './component/Product/ProductDetails'

import Contact from './component/layout/Contact/Contact'
import NotFound from "./component/layout/Not Found/NotFound.js";
import Products from './component/Product/Product'; 
import Search from './component/Product/Search';
import LoginSignUp from "./component/User/LoginSignUp.js"
import Profile from "./component/User/Profile.js"
import store from './store'
import { loadUser } from './actions/userActions';
import UserOptions from'./component/layout/Header/UserOptions.js'
import { useSelector } from "react-redux";
import ProtectedRoute from './component/Route/ProtectedRoute'
// import ProtectedRouteAdmin from './component/Route/ProtectedRouteAdmin'
import UpdateProfile  from './component/User/UpdateProfile'
import UpdatePassword  from './component/User/UpdatePassword'
import ForgotPassword  from './component/User/ForgotPassword'
import ResetPassword  from './component/User/ResetPassword'
import Cart  from './component/Cart/Cart'
import Shipping  from './component/Cart/Shipping'
import ConfirmOrder from './component/Cart/ConfirmOrder'
import OrderSuccess from './component/Cart/OrderSuccess'
import MyOrders from './component/Order/MyOrders'
import OrderDetails from './component/Order/OrderDetails'
import DashBoard from './component/admin/DashBoard'
import ProductList from './component/admin/ProductList'
import NewProduct from './component/admin/NewProduct'
import UpdateProduct from './component/admin/UpdateProduct'
import OrderList from './component/admin/OrderList'
import EditOrder from './component/admin/EditOrder'
import UserList from './component/admin/UserList'
import UpdateUser from './component/admin/UpdateUser'
import ProductReviews from './component/admin/ProductReviews'
import About from './component/layout/About/About';


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    })
    store.dispatch(loadUser())
  },[]);

  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/products/:keyword" element={<Products/>}/>
        <Route path="/search" element={<Search/>}/>

        <Route path="/account" element={(<ProtectedRoute><Profile /></ProtectedRoute>)} />

        <Route path="/me/update" element={(<ProtectedRoute><UpdateProfile /></ProtectedRoute>)} />

        <Route path="/password/update" element={(<ProtectedRoute><UpdatePassword /></ProtectedRoute>)} />

        <Route  path='/password/forgot' element = {<ForgotPassword/>}/>
        <Route  path='/password/reset/:token' element = {<ResetPassword/>}/>

        <Route  path='/cart' element = {<Cart/>}/>

        <Route path="/login/shipping" element={(<ProtectedRoute><Shipping /></ProtectedRoute>)} />

       

        <Route path="/success" element={(<ProtectedRoute><OrderSuccess/></ProtectedRoute>)} />
        <Route path="/orders" element={(<ProtectedRoute><MyOrders/></ProtectedRoute>)} />

        <Route path="/order/confirm" element={(<ProtectedRoute><ConfirmOrder /></ProtectedRoute>)} />
        <Route path="/order/:id" element={(<ProtectedRoute><OrderDetails/></ProtectedRoute>)} />

        <Route path="/admin/dashboard" element={(<ProtectedRoute ><DashBoard/></ProtectedRoute>)} />

        <Route path="/admin/products" element={(<ProtectedRoute ><ProductList/></ProtectedRoute>)} />
        <Route path="/admin/product" element={(<ProtectedRoute ><NewProduct/></ProtectedRoute>)} />

        <Route path="/admin/product/:id" element={(<ProtectedRoute ><UpdateProduct/></ProtectedRoute>)} />

        <Route path="/admin/orders" element={(<ProtectedRoute ><OrderList/></ProtectedRoute>)} />
        <Route path="/admin/order/:id" element={(<ProtectedRoute ><EditOrder/></ProtectedRoute>)} />

        <Route path="/admin/users" element={(<ProtectedRoute ><UserList/></ProtectedRoute>)} />
        
        <Route path="/admin/user/:id" element={(<ProtectedRoute ><UpdateUser/></ProtectedRoute>)} />

        <Route path="/admin/reviews" element={(<ProtectedRoute ><ProductReviews/></ProtectedRoute>)} />
        

        <Route  path='/contact' element = {<Contact/>}/>
        <Route  path='/about' element = {<About/>}/>
        <Route path='/login' element={<LoginSignUp/>}/>
        <Route path='*' element={<NotFound/>}/>

      </Routes>

      {/* <Footer/>      */}
    </Router>
  );
}

export default App;
