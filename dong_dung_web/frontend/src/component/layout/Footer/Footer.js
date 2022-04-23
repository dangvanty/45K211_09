import React from 'react';
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./footer.css"

const Footer = () => {
  return(
      <footer id='footer'>
          <did class = "leftFooter">
              <h4>DOWNLOAD OUR APP</h4>
              <p>Dowload App for Android and IOS mobile phone</p>
              <img src = {playStore} alt = "playStore" />
              <img src = {appStore} alt = "appStore" />
          </did>

          <div class = "midFooter">
              <h1>ECOMMERCE</h1>
              <p>High Quality is out first priority</p>

              <p>Copyrights 2022 &copy; MeAbhiSingh</p>
          </div>

          <div class = "rightFooter">
              <h4>Follow Us</h4>
              <a href=''>Instagram</a>
              <a href=''>Facebook</a>
              <a href=''>Youtube</a>

          </div>
      </footer>
  );
};

export default Footer