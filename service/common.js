const passport = require("passport")

exports.isAuthenticated = (req, res, done) => {
   return passport.authenticate("jwt")
}

exports.sanitizeUser = (user) => {
    return { _id: user._id, role: user.role }
}