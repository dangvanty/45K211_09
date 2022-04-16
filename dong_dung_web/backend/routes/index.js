const product =require("./productRoute");
const user =require("./userRoute");
const order=require("./orderRoute");


function routes(app){
    app.use("/api/v1",product);
    app.use("/api/v1",user);
    app.use("/api/v1",order);
}
module.exports = routes;
