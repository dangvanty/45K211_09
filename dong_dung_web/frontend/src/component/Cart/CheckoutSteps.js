import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import DescriptionIcon from "@material-ui/icons/Description";
// import ReceiptIcon from "@material-ui/icons/Receipt";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Thông tin giao hàng</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Đơn hàng</Typography>,
      icon: <DescriptionIcon />,
    },
    // {
    //   label: <Typography>Xác nhận đặt hàng</Typography>,
    //   icon: <ReceiptIcon />,
    // },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "#EAB543" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
