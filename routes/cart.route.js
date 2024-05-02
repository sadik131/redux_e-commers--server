const express = require("express")
const { getCartItem, addCartItem, updateItem, deleteItem } = require("../controlers/cart")
const router = express.Router()

router
    .get("/:id", getCartItem)
    .post("/", addCartItem)
    .patch("/", updateItem)
    .delete("/:id", deleteItem)


module.exports = router