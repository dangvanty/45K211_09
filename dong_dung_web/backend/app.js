const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const routes = require('./routes');

const errorMiddleware= require('./middleware/error')
// support post API
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// call router
routes(app);

//middleware for error

app.use(errorMiddleware);

module.exports=app
