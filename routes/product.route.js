const express = require("express")
const { createProudct, getProudcts, deleteProduct, getProductById, updateProduct } = require("../controlers/products")
const router = express.Router()

router
    .get("/", getProudcts)
    .get("/:id", getProductById)
    .post("/", createProudct)
    .patch("/:id", updateProduct)
    .delete("/:id", deleteProduct)


module.exports = router