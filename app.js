var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors')
require("dotenv").config();

var indexRouter = require("./routes/index");
var itemsRouter = require("./routes/items");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors({origin: '*'}))
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/** ENV VARIABLES **/
const dbURL = process.env.DB_URL;
const dbPassword = process.env.DB_PASS;
const dbUser = process.env.DB_USER;

/**CONNECT TO DB */
const atlasURI = `mongodb+srv://${dbUser}:${dbPassword}@${dbURL}`;
mongoose.connect(atlasURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("error", console.error);
mongoose.connection.on("open", function () {
    console.log("Database connection established...");
});

app.use("/", indexRouter);
app.use("/items", itemsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
