const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    totalPrice: {
        type: Number,
        required: true,
    },
    product: {
        type: Array,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String
    },
    paymentMethod: {
        type: String,
        required: true
    },
    address:{
        type: Object
    }
}, {
    timestamps: true
})
const Order = mongoose.model('Order', orderSchema);
module.exports = Order

