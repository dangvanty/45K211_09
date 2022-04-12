const express = require("express");
const { myOrders } = require("../controlllers/orderControllers");
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles}=require("../middleware/auth");


router.route("/order/new").post(isAuthenticatedUser,newOrder);
router.route("/order/:id").get(isAuthenticatedUser,getSingOrder)

router.route("/orders/me").get(isAuthenticatedUser,myOrders);

module.exports = router;
