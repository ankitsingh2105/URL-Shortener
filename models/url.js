const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true
    },
    visitHistory: {
        clicks: {
            type: Number,
            default: 0
        },
        timeOfClick: [
            {
                type: Date,
            }
        ]
    }
}, { timestamps: true });

const urlModel = mongoose.model("url", urlSchema);

module.exports = urlModel;
