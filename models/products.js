const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    discountPercentage: {
        type: Number
    },
    price:{
        type:Number,
        required:true
    },
    rating: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    }

},{
    timestamps:true
})
const Product = mongoose.model('Product', productSchema);
module.exports = Product
