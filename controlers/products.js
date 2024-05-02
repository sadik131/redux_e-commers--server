const Product = require("../models/products")

// get all products
exports.getProudcts = async (req, res) => {
    try {
        let query = {};
        if (req.query.brand) {
            query.brand = req.query.brand;
        }
        if (req.query.category) {
            query.category = req.query.category;
        }
        if (req.query.brand) {
            query.brand = req.query.brand;
        }
        let sort = {};
        if (req.query._sort && req.query._order) {
            sort[req.query._sort] = req.query._order === 'desc' ? -1 : 1;
        }
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        let skip = (page - 1) * limit;
        let productQuery = Product.find(query).sort(sort).skip(skip).limit(limit);
        let products = await productQuery.exec();
        res.status(200).json({
            success: true,
            products
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
exports.createProudct = async (req, res) => {
    const doc = req.body
    try {
        const product = await Product.create(doc)
        console.log(product)
        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}

// get prodcut by id
exports.getProductById = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findById({ _id: id })
        res.status(200).json({
            product
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
        id, req.body
    }
}

// update prodcut by id
exports.updateProduct = async (req, res) => {
    const { id } = req.params
    const data = req.body
    try {
        const product = await Product.findByIdAndUpdate(id, data, { new: true })
        res.status(200).json({
            product
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}

exports.deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        const result = await Product.deleteOne({ _id: id })
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