const Cart = require("../models/cart")

// get cart by id
exports.getCartItem = async (req, res) => {
    try {
        const { id } = req.params
        const result = await Cart.find({ user: id }).populate("items").populate("user")
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

// addTo cart
exports.addCartItem = async (req, res) => {
    const doc = req.body
    try {
        const cart = await Cart.create(doc)
        await cart.populate("user")
        await cart.populate("items")
        console.log(cart)
        res.status(200).json({
            success: true,
            cart
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}

// update cart item
exports.updateItem = async (req, res) => {
    const { productId, quantity } = req.body
    try {
        const cart = await Cart.findByIdAndUpdate(productId,
            { quantity },
            { new: true }).populate("items")
        res.status(200).json({
            success: true,
            cart
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}

exports.deleteItem = async (req, res) => {
    const { id } = req.params
    try {
        const cart = await Cart.findByIdAndDelete({ _id: id })
        res.status(200).json({
            success: true,
            cart
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}