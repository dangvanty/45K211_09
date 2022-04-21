import React, { Fragment, useState, useEffect } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PhoneIcon from "@material-ui/icons/Phone";
import { useAlert } from "react-alert";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate } from "react-router-dom";
const Shipping = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [state, setState] = useState(false)
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Số điện thoại không chính xác");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, phoneNo })
    );
    navigate("/order/confirm");
  };
  const addressHandler=(e)=>{
    setAddress(e.target.value)
    setState(true)
    
  }
 
  const phoneHandler=(e)=>{
    setPhoneNo(e.target.value)
    setState(true)
  }
  useEffect(() => {
    setAddress("")
    setPhoneNo("")
    setCity("")
  }, [state])
  

  return (
    <Fragment>
      <MetaData title="Thông tin giao hàng" />

      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Thông tin giao hàng</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Địa chỉ"
                required
                value={address}
                onChange={addressHandler}
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="Thành phố"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={phoneHandler}
                size="10"
              />
            </div>

           

            

            <input
              type="submit"
              value="Tiếp tục"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
