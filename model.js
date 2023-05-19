const mongoose = require("mongoose");

const image = mongoose.Schema({
    imageUrl : {
        type: String,
    },

}, { timestamps: true });

var model = mongoose.model('image', image);

module.exports = model;