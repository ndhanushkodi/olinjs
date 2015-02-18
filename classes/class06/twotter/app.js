var express = require("express");
var session = require('express-session');
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs  = require("express-handlebars");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
//OAUTH
var config = require('./oauth.js')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
//OAUTH
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
app.use(methodOverride());
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));





// serialize and deserialize
passport.serializeUser(function(user, done) {
	console.log("serialize");
	console.log(user);
done(null, user);
});
passport.deserializeUser(function(obj, done) {
	console.log("deserialize");
done(null, obj);
});

// config
passport.use(new FacebookStrategy({
 clientID: config.facebook.clientID,
 clientSecret: config.facebook.clientSecret,
 callbackURL: config.facebook.callbackURL
},
function(accessToken, refreshToken, profile, done) {
 process.nextTick(function () {
   return done(null, profile);
 });
}
));








//ROUTES!!!!!!!!!!!
app.get("/", ensureAuthenticated, index.twotter);
//app.get("/", index.twotter);

//app.post("/login", index.login);
app.get("/auth", index.showLogin);
app.post("/newTwote", index.newTwote);



app.post('/login',
passport.authenticate('facebook'),
function(req, res){
	console.log('hi');
	res.send('nothing');
});

app.get('/auth/facebook/callback',
passport.authenticate('facebook', { failureRedirect: '/' }),
index.login);


app.get('/logout', function(req, res){
req.logout();
res.redirect('/');
});






app.listen(process.env.PORT || PORT);




function ensureAuthenticated(req, res, next) {
	console.log('ensureAuthenticated');
	console.log(req.user);
	console.log(req.session);
	console.log(req.passport);
if (req.isAuthenticated()) { return next(); }
console.log('not logged in');
res.redirect('/auth')
}