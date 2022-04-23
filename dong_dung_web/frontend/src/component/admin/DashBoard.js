import React, {useEffect} from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userActions";
import MetaData from "../layout/MetaData";
// import { Slider } from "@material-ui/core";
import {formatNumber} from "../Product/formatPrice"
const DashBoard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      if(item.orderStatus =="Đã giao hàng"){
        totalAmount += item.totalPrice;
      }
     
    });

  

  const doughnutState = {
    labels: ["Hết hàng", "Còn hàng"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length -outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Thống kê | Admin" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Thống kê</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Tổng doanh thu <br /> <p style={{color:"green"}}>{totalAmount.toFixed(3)} <small style={{ color:"white"}}>triệu đồng</small></p>  
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Sản phẩm</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Đơn hàng</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Người dùng</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

       

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
