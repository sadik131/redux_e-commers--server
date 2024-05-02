const express = require("express")
const { getBrands, createBrand } = require("../controlers/brans")
const router = express.Router()

router.route("/")
    .get(getBrands)
    .post(createBrand)


module.exports = router