var express = require("express");
var router = express.Router({mergeParams : true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");


//==================================//
// COMMENT ROUTES //
//=================================//

//SHOW FORM
router.get("/new", middleware.isLoggedIn, middleware.checkCampgroundId, function(req,res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	})
});
//CREATE COMMENT
router.post("/", middleware.isLoggedIn, middleware.checkCampgroundId, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", "Something went wrong");
					console.log(err);
				} else {
					//add username and ID to comments
					comment.author.id = req.user._id;
				    comment.author.username = req.user.username;
				    //save comment
				    comment.save();
				    campground.comments.push(comment);
				    campground.save();
				    console.log(comment);
				    req.flash("success", "Successfully added comment");
				    res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

// EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnerhsip, middleware.checkCampgroundId, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			console.log(err);
			res.redirect("back");
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	});
});

//COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnerhsip, middleware.checkCampgroundId, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			console.log(err);
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id );
		}
	});
});

// DESTROY!!!!!!!!!
router.delete("/:comment_id", middleware.checkCommentOwnerhsip, middleware.checkCampgroundId, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
		   console.log(err);
           res.redirect("back");
       } else {
		   req.flash("success", "Comment deleted");
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});



module.exports = router;