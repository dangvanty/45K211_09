const product =require("./productRoute");
const user =require("./userRoute");

function routes(app){
    app.use("/api/v1",product);
    app.use("/api/v1",user);
}
module.exports = routes;