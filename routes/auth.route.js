const express = require("express")
const { loginUser, signUpUser } = require("../controlers/auth")
const router = express.Router()

router.post("/login", loginUser).post("/signup", signUpUser)


module.exports = router