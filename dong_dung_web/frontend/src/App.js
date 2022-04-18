import './App.css';

import Header from "./component/layout/Header/Header.js"
import {BrowserRouter as Router ,Routes, Route} from "react-router-dom"

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
import UpdateProfile  from './component/User/UpdateProfile'
import UpdatePassword  from './component/User/UpdatePassword'
import ForgotPassword  from './component/User/ForgotPassword'
import ResetPassword  from './component/User/ResetPassword.js'
import Cart  from './component/Cart/Cart.js'
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
        <Route  path='/contact' element = {<Contact/>}/>
        <Route path='/login' element={<LoginSignUp/>}/>
        <Route path='*' element={<NotFound/>}/>

      </Routes>

      <Footer/>     
    </Router>
  );
}

export default App;
