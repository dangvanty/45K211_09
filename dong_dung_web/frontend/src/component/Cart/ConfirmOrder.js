import React, { Fragment, useEffect } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch} from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import {formatNumber} from "../Product/formatPrice"
import {createOrder,clearErrors } from "../../actions/orderAction"

const ConfirmOrder = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();

 
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
 const orderItems =cartItems;
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingPrice = itemsPrice > 1 ? 0 : 0.05 ;

  const taxPrice = itemsPrice * 0.01 ;

  const totalPrice = shippingPrice + taxPrice + itemsPrice;
 
  const address = `${shippingInfo.address}, ${shippingInfo.city}`;

  
    // const data = {
    //   subtotal,
    //   shippingCharges,
    //   tax,
    //   totalPrice,
    // };
    // sessionStorage.setItem("orderInfo", JSON.stringify(data));
    // shippingInfo,orderItems,itemsPrice,taxPrice,shippingPrice,totalPrice
  
  const orderSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        shippingInfo,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
      })
    );
    navigate("/success")
  }
  // useEffect(() => {
  //   if (error) {
  //     alert.error(error);
  //     dispatch(clearErrors());
  //   }
  // }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Đơn Hàng" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Thông tin giao hàng</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Tên khách hàng</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Số điện thoại</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Địa chỉ</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Chi tiết đơn hàng</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X {formatNumber(item.price)} đ={" "}
                      <b>{formatNumber(item.price * item.quantity)} đ</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <form className="orderSummary" 
            encType="application/json"
            onSubmit={orderSubmit}
          >
            <div>
            <Typography>Đơn hàng </Typography>
            <div>
              
                <p>Thành tiền</p>
                <span>{formatNumber(itemsPrice)} đ</span>
              </div>
              <div>
                <p>Phí vận chuyển</p>
                <span>{formatNumber(shippingPrice)} đ</span>
              </div>
              <div>
                <p>Thuế <small style={{color:"tomato"}}>1%</small> :</p>
                <span>{formatNumber(taxPrice)} đ</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Tổng cộng</b>
              </p>
              <span>{formatNumber(totalPrice)} đ</span>
            </div>

            <button type="submit">Đặt hàng</button>
            
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
