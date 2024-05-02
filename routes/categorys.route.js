const express = require("express")
const { getCategores, createcategory } = require("../controlers/catagores")
const router = express.Router()

router.route("/")
    .get(getCategores)
    .post(createcategory)


module.exports = router