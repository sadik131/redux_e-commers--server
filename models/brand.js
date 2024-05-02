const mongoose = require("mongoose")

const brandSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
    },
    lable: {
        type: String,
        required: true
    },
},{
    timestamps:true
})
const Brands = mongoose.model('Brands', brandSchema);
module.exports = Brands
