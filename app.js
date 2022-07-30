/**
 * Node Modules.
 */
const express = require("express");
const path = require("path");
const cors = require("cors");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

/**
 * Configs.
 */
const { sessionConfig } = require("./configs/sessionConfig.js");

/**
 * Utils.
 */
const connectDB = require("./utils/db/conncetDB.js");
const ServerError = require("./utils/ServerError.js");
const currentUser = require("./utils/user/currentUser.js");

/**
 * Routers.
 */
const UserRouter = require("./routes/user/user.router.js");
const AdminRouter = require("./routes/admin/admin.router.js");

/**
 * Declarations.
 */
const app = express();
const PORT = process.env.PORT || 3001;

/**
 * Server Middlewares.
 */
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(methodOverride("_method"));
app.use(cookieParser(process.env.SIGN_COOKIE));
app.use(session(sessionConfig));
app.use(morgan("dev"));
app.use(flash());

/**
 * Global res variables.
 */
app.use(async (req, res, next) => {
    res.locals.currentUser = await currentUser(req, res);
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

/**
 * Routes.
 */
app.use("/", UserRouter);
app.use("/", AdminRouter);


/**
 * Home Route.
 */
app.route("/")
    .get((req, res)=>{
        res.render("home");
    });
//MONGODB_URI=mongodb+srv://harshitrv:Ty60VWGHE3d8H03B@cluster0.25abo.mongodb.net/TechMarathonDB?retryWrites=true&w=majority


app.listen(PORT, ()=>{
    connectDB();
    console.log(`${process.env.NODE_ENV} server running on port ${PORT}`);
})