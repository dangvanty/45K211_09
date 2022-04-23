import React from "react";
import "./sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Đồng Dũng" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Thống kê
        </p>
      </Link>
      <div className="treeView">
      <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Sản phẩm">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="Tất cả" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Thêm mới" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
        </div>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Đơn hàng
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Người dùng
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Đánh giá
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
