const mongoose = require('../db/connection')

const beTrendSchema = new mongoose.Schema({
    name: {type:String, required: true},
    title: String,
    img: String,
    description: String,
    price: {type: Number, min: 0},
    qty: {type: Number, min: 0}
})

const Product = mongoose.model('Product', beTrendSchema)

module.exports = Product