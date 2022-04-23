const express = require("express");
const { CreateNewOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder,deleteOrderForUser } = require("../controller/orderController");

const router =express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser,CreateNewOrder)

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me")
      .get(isAuthenticatedUser, myOrders);
  router.route("/orders/me/:id")    
      .delete(isAuthenticatedUser,deleteOrderForUser)

router
    .route("/admin/orders")
    .get(isAuthenticatedUser, authorizeRoles("admin"),getAllOrders);

router
    .route("/admin/order/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"),updateOrder)
    .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);

module.exports=router;
