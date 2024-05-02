const mongoose = require("mongoose")

const categoreSchema = new mongoose.Schema({
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
const Categore = mongoose.model('Categore', categoreSchema);
module.exports = Categore
