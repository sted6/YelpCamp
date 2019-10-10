var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

// MIDDLEWARE
middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You must be logged in to do that!");
	res.redirect("/login");
};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "Campground not found");
				res.redirect("back");
			} else {
				if(foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You must be logged in to do that!");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnerhsip = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				console.log(err);
				res.redirect("back");
			} else {
				if(foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You must be logged in to do that");
		res.redirect("back");
	}
};

middlewareObj.checkCampgroundId = function (req, res, next) {
    Campground.findById(req.params.id, function(err, campground){
        if(err || !campground){
            req.flash("error", "Error: Campground not found.");
            res.redirect("back");
        } else {
            res.locals.foundCampground = campground;
            next();
        }
    });
};
	
	

module.exports = middlewareObj;