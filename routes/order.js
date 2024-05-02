const express = require("express")
const { createOrder, getOrderByUserId, getAllOrders, updateStatus } = require("../controlers/order")
const router = express.Router()

router.get("/", getAllOrders);
router.get("/:id", getOrderByUserId);
router.post("/", createOrder);
router.patch("/", updateStatus);


module.exports = router