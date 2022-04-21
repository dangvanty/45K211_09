import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import {formatNumber} from"../Product/formatPrice"
const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Giá: ${formatNumber(item.price)} đ`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Xóa </p>
      </div>
    </div>
  );
};

export default CartItemCard;
