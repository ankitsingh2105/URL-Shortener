const express = require("express");

const  app = express();

const urlRouter = require("./routers/urlRouter");

const connectToMongoDB = require("./connect");

const path = require("path");
app.set("view engine" ,"ejs");
app.set("views" , path.resolve("./views"));

// todo :: for doing mongodb operations!!
const urlModel = require("./models/url");

// for parsing json
app.use(express.json())

// for form data 
app.use(express.urlencoded({extended : false}));

try{
    connectToMongoDB("mongodb://127.0.0.1:27017/urlShortener")
    console.log('connected to mongoDB');
}
catch(error){
    console.log("Error : ", error);
}

app.get("/allUrls" , async(req , response)=>{
    try{
        const allUrls = await urlModel.find({});
        let data = "";
        console.log("LIST :: " , allUrls);
        let listOfUrls = allUrls.forEach((e)=>{
            console.log("in for each :: " , e.redirectURL)
            data+= `<h1>${e.redirectURL}</h1><br/>`;
        })
        console.log("This :: " , data);
        // response.send(data);
        response.render("home" , {
            urls : allUrls,
            name : "Ankit"
        });
    }   
    catch(error){
        response.send(error);
    } 
})

app.use("/url" , urlRouter);

app.get("/", (req , response)=>{
    response.send("Hi");
})

app.listen(2000, ()=>{
    console.log("Servers is up and running");
}) 