var express = require("express");
var session = require('express-session');
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs  = require("express-handlebars");
var mongoose = require("mongoose");

var index = require("./routes/index");


var app = express();
mongoose.connect(process.env.MONGOURI || 'mongodb://localhost/test');
var PORT = 3000;

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));

//ROUTES!!!!!!!!!!!
// app.post("/delOrd", index.resolveOrder);
app.get("/", index.showLogin);
app.post("/login", index.login);
app.get("/main", index.twotter);
app.post("/newTwote", index.newTwote);


app.listen(process.env.PORT || PORT);