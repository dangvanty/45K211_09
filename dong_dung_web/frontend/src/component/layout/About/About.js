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
           <p>Email: dongdungnoithat@gmail.com</p>
            </div>
          </div>
          <div className="aboutSectionContainer2">
          <Typography component="h2">Chính sách vận chuyển, lắp đặt: </Typography>
          <p>Sau khi đặt hàng Online trên Website. Quý khách có thể lựa chọn nhận hàng tại cửa hàng của Đồng Dũng mà Quý khách thấy thuận tiện. Chúng tôi sẽ chuẩn bị hàng trước và thông báo cho Quý khách về thời gian dự kiến hàng về. Ngay khi hàng về tới cửa hàng, Đồng Dũng sẽ báo cho Quý khách và hướng dẫn đầu mối tiếp đón khách hàng tại cửa hàng.</p>
          <Typography component="h2">Chính sách HỦY ĐƠN HÀNG</Typography>
          <p>
          <ul>
              <li>
              Đồng Dũng cho phép Quý khách hủy trực tiếp đơn hàng đã đặt mua trên Website theo chính sách của Đồng Dũng với điều kiện đơn hàng chưa được giao đi. 
              </li>
              <li>
              Trường hợp Quý khách muốn hủy đơn hàng, Quý khách vui lòng liên hệ đến số điện thoại của cửa hàng: 0362988444 để được hỗ trợ.
              </li>
          </ul>
          </p>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default About;
