const Auth = require("../models/auth")
const Order = require("../models/order")

// get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const order = await Order.find({})
        res.status(200).json({
            order
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}

// get all products by Id
exports.getOrderByUserId = async (req, res) => {
    try {
        const { id } = req.params
        const result = await Order.find({ userId: id })
        res.status(200).json({
            success: true,
            result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}

// create a product
exports.createOrder = async (req, res) => {
    const doc = req.body
    try {
        const order = await Order.create(doc)
        console.log(order)
        res.status(200).json({
            order
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}

// update the order status
exports.updateStatus = async (req, res) => {
    const { id, status } = req.body
    try {
        const result = await Order.findOneAndUpdate({ _id: id },
            { $set: { status: status } },
            { new: true })
        res.status(200).json({
            result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}
