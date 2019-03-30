var Campgrounds = require("../models/campground");
var Comment    = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkOwnerShip = function(req,res,next){
     //csak akkor törhetem a ha én adtam be
    //if user logedin?
        if(req.isAuthenticated()){
             Campgrounds.findById(req.params.id,function(err,foundCampground){
                 if(err){
                    req.flash("error","Campground not found");
                    res.redirect("back");
                }else{
            // if so-> does the user own the campground 
                    if(foundCampground.author.id.equals(req.user._id)|| req.user.isAdmin){
                       next();
                    }else{
                        req.flash("error","You do not have permission to do that");
                        res.redirect("back");
                    }
           
                    } 
                    });
          
        }else{
            req.flash("error","You need to be loggedin to do that");
            res.redirect("back");
        }

};

middlewareObj.checkCommentOwnerShip = function(req,res,next){
       if(req.isAuthenticated()){
             Comment.findById(req.params.comment_id,function(err,foundComment){
                 if(err){
                    res.redirect("back");
                }else{
            // if so-> does the user own the campground 
                    if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                       next();
                    }else{
                        req.flash("error","You do not have permission to do that");
                        res.redirect("back");
                    }
           
                    } 
                    });
          
        }else{
            req.flash("error","You need to be loggedin to do that");
            res.redirect("back");
        }
};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be loggedin to do that");
    res.redirect("/login");
};

module.exports = middlewareObj;