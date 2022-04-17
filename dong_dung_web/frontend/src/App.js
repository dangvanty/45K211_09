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

function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    })
  },[]);

  return (
    <Router>
      <Header/>

      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="product/:id" element={<ProductDetails/>}/>
        <Route path="products" element={<Products/>}/>
        <Route path="products/:keyword" element={<Products/>}/>
        <Route path="search" element={<Search/>}/>
        <Route  path='/contact' element = {<Contact/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>

      <Footer/>     
    </Router>
  );
}

export default App;
