import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders, deleteOrderForUser} from "../../actions/orderAction";
import { DELETE_ORDER_USER_RESET } from "../../constants/orderConstants";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate} from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";
import {formatNumber} from "../Product/formatPrice"
const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
 
  const { error: deleteError, isDeleted } = useSelector((state) => state.orderUser);

  const { user } = useSelector((state) => state.user);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrderForUser(id));
  };
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 200, flex: 0.4 },

    {
      field: "status",
      headerName: "Trạng thái đơn hàng",
      minWidth: 150,
      flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Đã giao hàng"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số lượng sản phẩm",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Tổng cộng",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Xem chi tiết",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
          {params.getValue(params.id,"status") =="Đang xử lý" && (
            
            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
            
          )}
          </>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: `${formatNumber(item.totalPrice)} đ`,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Xóa đơn hàng thành công");
      navigate("/orders");
      dispatch({ type: DELETE_ORDER_USER_RESET });
    }

    dispatch(myOrders());
  }, [dispatch, alert, error, navigate, isDeleted, deleteError]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Đơn hàng`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">Đơn hàng của {user.name}</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
