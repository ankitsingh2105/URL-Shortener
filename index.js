const express = require("express");

const  app = express();

const urlRouter = require("./routers/urlRouter");

console.log("Url :: " , urlRouter);

const connectToMongoDB = require("./connect");

app.use(express.json())

try{
    connectToMongoDB("mongodb://127.0.0.1:27017/urlShortener")
    console.log('connected to mongoDB');
}
catch(error){
    console.log("Error : ", error);
}


app.use("/url" , urlRouter);

app.get("/", (req , response)=>{
    response.send("Hi");
})

app.listen(2000, ()=>{
    console.log("Servers is up and running");
}) 