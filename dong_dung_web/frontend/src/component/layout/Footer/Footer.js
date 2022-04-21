import React from 'react'

import { Link } from 'react-router-dom'

import './Footer.css'
import logo from "../../../images/logo.png"
import MyComponent from './GoogleApiWrapper.js';

// import {Button} from "../Button/Button"

function Footer () {
  return (
    <div className='footer-container'>
       <section className='footer-subcription'>
           <p className='footer-subcription-heading'>
                Cửa hàng đồ gỗ nội thất <strong>ĐỒNG DŨNG</strong> chất lượng uy tín hàng đầu Quảng Nam 
           </p>
           
           <p className='footer-subcription-text'>
              Địa chỉ: Điện An - Điện Bàn - Quảng Nam
           </p>
           <div className='footer-subcription-map'>
             <MyComponent/>
            </div>
           {/* <div className='input-areas'>
               <form>
                   <input className=' footer-input'
                   name='email'
                   type='email'
                   placeholder='Email của bạn'
                   />
                   <Button buttonStyle='btn--outline'>Gửi đi</Button>
               </form>
           </div> */}
       </section>
       <div className='footer-links'>
        <div className='footer-link-wrapper'>
         <div className='footer-link-items'>
             <h2>Chính sách</h2>
             <Link to='/'>Quy định chung</Link>
             <Link to='/'>Bảo mật thông tin</Link>
             <Link to='/'>Vận chuyển, lắp đặt</Link>
             <Link to='/'>Bảo hành</Link>
             <Link to='/'>Đổi trả và hoàn tiền</Link>
         </div>
         <div className='footer-link-items'>
             <h2>Liên hệ</h2>
             <Link to='/'>Giới thiệu Đồng Dũng</Link>
             <Link to='/'>Thông tin liên hệ</Link>
             <Link to='/'>Hỏi đáp</Link>
             <Link to='/'>Tuyển dụng</Link>
         </div>
        </div>
        <div className='footer-link-wrapper'>
         <div className='footer-link-items'>
             <h2>Sản phẩm</h2>
             <Link to='/'>Nội thất phòng khách</Link>
             <Link to='/'>Nội thất phòng ngủ</Link>
             <Link to='/'>Nội thất phòng thờ</Link>
             <Link to='/'>Đồ gỗ mỹ nghệ</Link>
         </div>
         <div className='footer-link-items'>
             <h2>Truyền thông</h2>
             <Link to='/'>Instagram</Link>
             <Link to='/'>Facebook</Link>
             <Link to='/'>Youtube</Link>
             <Link to='/'>Twitter</Link>
         </div>
        </div>
       </div>
       <section className='social-media'>
           <div className='social-media-wrap'>
               <div className='footer-logo'>
                   <Link to='/' className='social-logo'>
                       <img src={logo} width="155px"/>
                   </Link>
               </div>
               <small className='website-rights'>Đồng Dũng © 2022 Bản quyền nhóm 9 - lớp45k21.1</small>
               <div className='social-icons'>
                <Link className='social-icon-link facebook' to='/' target='_blank' aria-label='Facebook'><i className='fab fa-facebook-f'/></Link>
                <Link className='social-icon-link instagram' to='/' target='_blank' aria-label='Instagram'><i className='fab fa-instagram'/></Link>
                <Link className='social-icon-link youtube' to='/' target='_blank' aria-label='Instagram'><i className='fab fa-youtube'/></Link>
                <Link className='social-icon-link twitter' to='/' target='_blank' aria-label='Instagram'><i className='fab fa-twitter'/></Link>
                <Link className='social-icon-link linkedin' to='/' target='_blank' aria-label='LinkedIn'><i className='fab fa-linkedin'/></Link>
               </div>
           </div>
       </section>
   </div>
  )
  }


export default Footer;