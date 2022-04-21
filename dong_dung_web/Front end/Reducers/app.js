import { Router } from "express";
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"

function App(){
    React.useEffect(()=>{
        WebFont.load({
            google:{
                families:["Roboto","Droid Sans","chilanka"],

            },
        });
    });
}
return (
    <Router>
        <Headers/>
        <Router exact path ="/" component={home}>

        <Router exact path ="/product/:id" component={ProductDetails}/>
        <Router exact path ="/products" component={Products}/>
        <Router path ="/products/:keyword" component={Products}/>
        <Router exact path ="/search" component={Search}/>
        <Footer/>
    </Router>
);
