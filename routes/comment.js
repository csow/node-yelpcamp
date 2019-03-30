var express = require("express");
var router = express.Router({mergeParams:true});
var Campgrounds = require("../models/campground");
var Comment    = require("../models/comment");
var middleware  = require("../middleware");



//Comments create
router.post("/",middleware.isLoggedIn,function(req,res){
    //lookup campgrounds using ID
      Campgrounds.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
        // create a new comment and save to DB
        Comment.create(req.body.comment,function(err,comment){
           if(err){
                req.flash("error","Something went wrong");
               console.log(err);
           } else{
               // add username and id to comment ha kommentelek automatikusan oda adja a login nevemet
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               //összekapcsolni a kommentet a hozzátartozo camp-el
            campground.comments.push(comment);
            campground.save();
            req.flash("success","Successfully added comment");
            res.redirect("/campgrounds/"+ campground._id)
           }
        });
        }
    });
});



//Update comment
router.put("/:comment_id",middleware.checkCommentOwnerShip,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updateComment){
       if(err){
           res.redirect("back");
       }else{
           res.redirect("/campgrounds/" +req.params.id);
       } 
    });
});

//Delete comment
router.delete("/:comment_id",middleware.checkCommentOwnerShip,function(req,res){
   Comment.findByIdAndRemove(req.params.comment_id,function(err){
       if(err){
            res.redirect("back");
       }else{
            req.flash("success","Comment deleted");
           res.redirect("/campgrounds/"+req.params.id);
       }
   }) 
});

module.exports = router;