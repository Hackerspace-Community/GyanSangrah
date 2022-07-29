const MongoStore = require("connect-mongo");

module.exports.sessionConfig = {
    secret : process.env.SIGN_COOKIE,
    resave : false,
    saveUninitialized : false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        touchAfter: 24 * 60 * 60
    })
}