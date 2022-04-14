const express = require("express");
const { myOrders, getAllOrders, updateOrders, deleteOrders } = require("../controlllers/orderControllers");
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles}=require("../middleware/auth");


router.route("/order/new").post(isAuthenticatedUser,newOrder);
router.route("/order/:id").get(isAuthenticatedUser,getSingOrder)

router.route("/orders/me").get(isAuthenticatedUser,myOrders);


router.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);

router.route("/admin/order/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateOrders).delete(isAuthenticatedUser,
    authorizeRoles("admin"),deleteOrder);
    

module.exports = router;
