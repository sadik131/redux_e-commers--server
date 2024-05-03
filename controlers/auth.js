const Auth = require("../models/auth")
const bcrypt = require('bcrypt');
const { sanitizeUser } = require("../service/common");
const jwt = require("jsonwebtoken")

// get all products
exports.loginUser = async (req, res) => {
    res.json(req.user)
}

exports.checkUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        res.json({ status: "success", user: req.user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// create a product
exports.signUpUser = async (req, res) => {
    const doc = req.body
    try {
        const hashedPassword = await bcrypt.hash(doc.password, 10);
        const user = await Auth.create({ ...doc, password: hashedPassword })
        req.login(sanitizeUser(user), (err) => {
            if (err) {
                res.status(401).json(err)
            } else {
                const token = jwt.sign({ _id: user._id }, process.env.jwt_secret);
                res.status(201).json(token)
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}