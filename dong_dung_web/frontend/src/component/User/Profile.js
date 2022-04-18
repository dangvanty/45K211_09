import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import {useNavigate} from 'react-router-dom'

const Profile = () => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const navigate =useNavigate()
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [ isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name} | Hồ sơ`} />
          <div className="profileContainer">
            <div>
              <h1>Hồ sơ của tôi</h1>
              <img src={user.avatar.url ? user.avatar.url : "/Profile.png"} alt={user.name} />
              <Link to="/me/update">Chỉnh sửa hồ sơ</Link>
            </div>
            <div>
              <div>
                <h4>Họ và tên</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Ngày đăng ký</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">Đơn hàng của tôi</Link>
                <Link to="/password/update">Thay đổi mật khẩu</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Profile