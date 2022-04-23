import React from "react";
import "./aboutSection.css";
import { Button, Typography } from "@material-ui/core";
import logo from "../../../images/logo.png";
const About = () => {
    const visitFaceBook = () => {
        window.location = "https://www.facebook.com/%C4%90%E1%BB%93ng-D%C5%A9ng-112051864804270";
      };
  return (
      
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">Về chúng tôi</Typography>

        <div>
          <div>
            <img style={{ width:"50%"}}
              src={logo}
              alt="Đồng Dũng"
            />
            <Typography></Typography>
            <Button onClick={visitFaceBook} color="primary">
              Trang facebook của chúng tôi
            </Button>
            <div>
            <span>
            Cửa hàng đồ gỗ nội thất ĐỒNG DŨNG:
           </span>
           <br/>
           <p>Địa chỉ: Điện An - Điện Bàn - Quảng Nam</p>
           <p>Số điện thoại: 0362988444</p>
            </div>
          </div>
          <div className="aboutSectionContainer2">
          <Typography component="h2">Our Brands</Typography>
          
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default About;
