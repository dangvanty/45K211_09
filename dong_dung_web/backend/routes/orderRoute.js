const express = require("express");
const { CreateNewOrder } = require("../controller/orderController");

const router =express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser,CreateNewOrder)

module.exports=router;