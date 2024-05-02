const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    items: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth"
    },
    quantity:{
        type:Number,
        default:1
    }
}, {
    timestamps: true
})
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart
