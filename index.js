const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
const mongoose = require('mongoose');
const cors = require("cors")
const { createProudct } = require('./controlers/products');

// midlewar 
app.use(express.json())
app.use(cors())

// routes
const productRoute = require("./routes/product.route")
const brandsRouts = require("./routes/brands.route")
const categorysRoute = require("./routes/categorys.route")
const authRoute = require("./routes/auth.route")
const cartRoute = require("./routes/cart.route")
const userRoute = require("./routes/user.route")
const orderRoute = require("./routes/order")

// mongoDb Connection
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGOURL);
    console.log("db connected")
}

app.use("/product", productRoute)
app.use("/brand", brandsRouts)
app.use("/categorys", categorysRoute)
app.use("/auth", authRoute)
app.use("/cart", cartRoute)
app.use("/user",userRoute)
app.use("/order",orderRoute) 

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))