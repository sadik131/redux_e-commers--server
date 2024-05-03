const express = require("express")
const { loginUser, signUpUser, checkUser } = require("../controlers/auth")
const passport = require("passport")
const router = express.Router()

router
    .get("/check", passport.authenticate("jwt"), checkUser)
    .post("/signup", signUpUser)
    .post("/login", passport.authenticate("local"), loginUser)


module.exports = router