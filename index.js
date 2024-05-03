const express = require('express');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy;
const { isAuthenticated, sanitizeUser } = require('./service/common');
const Auth = require('./models/auth');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;


// jwt option
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.jwt_secret;



// Middleware
app.use(
    session({
        secret: "dfjdsjf",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors());

// Routes
const productRoute = require('./routes/product.route');
const brandsRouts = require('./routes/brands.route');
const categorysRoute = require('./routes/categorys.route');
const authRoute = require('./routes/auth.route');
const cartRoute = require('./routes/cart.route');
const userRoute = require('./routes/user.route');
const orderRoute = require('./routes/order');


// MongoDB Connection
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGOURL);
    console.log('DB connected');
}



// initializingPassport
passport.use("local", new LocalStrategy(async (username, password, done) => {
    try {
        const user = await Auth.findOne({ email: username })
        if (!user) return done(null, false)
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        const token = jwt.sign(sanitizeUser(user), jwt_secret);
        return done(null, token)
    } catch (error) {
        return done(error, false)
    }
}))

passport.use('jwt', new JwtStrategy(opts, async function (payload, done) {
    try {
        const user = await Auth.findOne({ _id: payload._id })
        if (user) {
            return done(null, sanitizeUser(user));
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(err, false);
    }

}));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, { _id: user._id, role: user.role });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});


// Routes
app.use('/product', isAuthenticated(), productRoute);
app.use('/brand', isAuthenticated(), brandsRouts);
app.use('/categorys', isAuthenticated(), categorysRoute);
app.use('/auth', authRoute);
app.use('/cart', isAuthenticated(), cartRoute);
app.use('/user', userRoute);
app.use('/order', isAuthenticated(), orderRoute);


app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
