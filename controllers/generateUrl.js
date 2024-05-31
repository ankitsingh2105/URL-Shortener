const shortid = require("shortid");
const urlSchema = require("../models/url");
const handleUrlShortening = async (req ,response, next) =>{
    const body = req.body;
    console.log("body :: " , body);
    const url = body.url;
    const shortId = shortid();
    console.log("in the middleware")
    if(!url) return response.send("No url received");
    await urlSchema.create({
        shortId : shortId,
        redirectURL : url,
        vistHistory : [],
    })
    return response.json({id : shortId});
} 

module.exports = handleUrlShortening;