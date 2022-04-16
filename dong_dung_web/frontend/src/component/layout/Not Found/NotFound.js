import React, { Fragment } from "react";
import ErrorIcon from "@material-ui/icons/Error";
import "./NotFound.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import MetaData from "../MetaData";

const NotFound = () => {
  return (
      <Fragment>
      <MetaData title="Không tìm thấy| Đồng Dũng" />
    <div className="PageNotFound">
      <ErrorIcon />

      <Typography>Không tìm thấy trang này</Typography>
      <Link to="/">Trang chủ</Link>
    </div>
    </Fragment>
  );
};

export default NotFound;
