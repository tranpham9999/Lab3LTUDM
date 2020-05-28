const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = Schema({
    Title: String,
    Summary: String,
    ImageUrl: String,
    Price: Number,
    Number: Number
}
, {
    versionKey: false
})

module.exports = mongoose.model("Product", ProductSchema);