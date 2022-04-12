const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());

//Router Imports
const product = require("./routers/productRoute");
const user = require("./routers/userRoute");
const order = require("./routes/orderRoute")

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

//Middleware for Errors 
app.use(errorMiddleware);

module.exports = app;
