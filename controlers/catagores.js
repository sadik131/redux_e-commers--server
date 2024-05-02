const Categore = require("../models/category")

// get all products
exports.getCategores = async (req, res) => {
    try {
        const result = await Categore.find({})
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
exports.createcategory = async (req, res) => {
    const doc = req.body
    try {
        const result = await Categore.create(doc)
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