const Brands = require("../models/brand")

// get all products
exports.getBrands = async (req, res) => {
    try {
        const brands = await Brands.find({})
        res.status(200).json({
            success: true,
            brands
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
exports.createBrand = async (req, res) => {
    const doc = req.body
    try {
        const brand = await Brands.create(doc)
        res.status(200).json({
            success: true,
            brand
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}