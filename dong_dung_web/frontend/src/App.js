import './App.css';
import header from "./component/layout/Header/Header.js";
import {BrowserRouter as Router, Route} from "react-router-dom";
import WebFont from "webfontloader";
import React from 'react';
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js"


function App() {
  React.useEffect(() => {
    WebFont.load({
      google:{
        families: ["Roboto", "Droid Sans", "Chilanka"],
      }
    })
  }, []);
  
  return ( 
  <Router>
    <Header />
    <Route exact path="/" component={Home} />

    <Footer />
  </Router>
  );
}

export default App;
