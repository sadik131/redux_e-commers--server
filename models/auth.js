const mongoose = require("mongoose");


const addressSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    country: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    payment: String
});

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    address: [addressSchema]
}, {
    timestamps: true
});

const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth;
