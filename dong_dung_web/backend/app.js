const express = require("express");

const app = express();

const errorMiddleware= require('./middleware/error')
app.use(express.json())
//Route Imports 
const product =require("./routes/productRoute")

app.use("/api/v1",product)

//middleware for error

app.use(errorMiddleware);

module.exports=app

