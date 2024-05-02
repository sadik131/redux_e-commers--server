const Auth = require("../models/auth")

// get all products
exports.loginUser = async (req, res) => {
    try {
        const userdoc = req.body
        const user = await Auth.findOne({ email: userdoc.email })
        if (!user) {
            res.status(401).json({ message: "wrong credentials" })
        } else if (user.password === userdoc.password) {
            res.status(200).json({
                success: true,
                user
            })
        } else {
            res.status(401).json({ message: "wrong credentials" })
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}

// create a product
exports.signUpUser = async (req, res) => {
    const doc = req.body
    try {
        const user = await Auth.create(doc)
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}