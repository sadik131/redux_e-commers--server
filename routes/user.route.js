const express = require("express")
const { getUserById, updateUser, deleteUserAddressById, updateUserAddress } = require("../controlers/user")
const router = express.Router()

router
.get("/:id", getUserById)
.post("/")
.patch("/", updateUser)
.patch("/updateAddress",updateUserAddress)
.delete("/address/:id/:addressId",deleteUserAddressById)


module.exports = router