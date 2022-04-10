import React from "react";
import {ReactNavbar} from "overlay-navbar"
import {FaSearch,FaUserCog,FaShoppingCart} from "react-icons/fa"
import logo from "../../../images/logo.png";

const options = {
    burgerColorHover: "#eb4034",
    logo,
    logoWidth: "20vmax",
    navColor1: "#EAB543",
    logoHoverSize: "10px",
    logoHoverColor: "#eb4034",
    link1Text: "Trang chủ",
    link2Text: "Sản phẩm",
    link3Text: "Liên hệ",
    link4Text: "Về chúng tôi",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "rgba(35, 35, 35,0.8)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#eb4034",
    link1Margin: "1vmax",
    profileIconUrl: "/login",
    profileIconColor: "rgba(35, 35, 35,0.8)",
    searchIconColor: "rgba(35, 35, 35,0.8)",
    cartIconColor: "rgba(35, 35, 35,0.8)",
    // cartIcon:`${FaSearch}`,
    profileIconColorHover: "#eb4034",
    searchIconColorHover: "#eb4034",
    cartIconColorHover: "#eb4034",
    cartIconMargin: "1vmax",
  };
  
  const Header = () => {
    return (
        <ReactNavbar
            {...options} 
            searchIcon={true} 
            SearchIconElement={FaSearch}  
            cartIcon={true}
            CartIconElement={FaShoppingCart}
            profileIcon={true}
            ProfileIconElement={FaUserCog}
            />)
  };
export default Header