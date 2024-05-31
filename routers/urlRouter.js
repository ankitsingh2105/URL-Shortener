const express = require("express");

const router = express.Router();

const generateURl = require("../controllers/generateUrl");

const urlModel = require("../models/url");

router.use(express.json());

router.post("/", generateURl, async (req, response) => {
    console.log("Hitting ? ");
    response.send("Router is working at the moment");
})

router.get("/:shortId", async (req, response) => {
    const shortId = req.params.shortId;
    console.log(shortId);
    try {
        const redirectUrl = await urlModel.findOneAndUpdate({
            shortId
        }, {
            $inc: {
                "visitHistory.clicks": 1,
            },
            $push: {
                "visitHistory.timeOfClick":  Date.now() 
            }
        })
        console.log(redirectUrl.redirectURL)
        // response.json(redirectUrl);
        response.redirect(redirectUrl.redirectURL);
    }
    catch (error) {
        response.status(404).json({
            "Error": error
        })
    }

})

module.exports = router
