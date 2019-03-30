require('dotenv').config();
var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    Campgrounds             = require("./models/campground"),
    Comment                 = require("./models/comment"),
    seedDB                  = require("./seed.js"),
    passport                = require("passport"),
    localStrategy           = require("passport-local"),
    passportLocalMonggose   = require("passport-local-mongoose"),
    User                    = require("./models/user"),
    methodOverride          = require("method-override"),
    flash                   = require("connect-flash")

var commentRoutes       = require("./routes/comment"),
    campgroundsRoutes   = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index")
    
   
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
mongoose.connect(url);


app.use(flash());
app.locals.moment = require('moment');
//==========PASSPORT CONFIG==========
app.use(require("express-session")({
    secret:"Movie stars",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use( new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==================================

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/puplic"));
app.use(methodOverride("_method"));



app.use(function(req,res,next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundsRoutes);


//=======================SERVER======================
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp has started");
});
