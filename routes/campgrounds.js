var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var middleware = require("../middleware");

// INDEX
router.get("/", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds/index",{campgrounds:allCampgrounds});
		}
	});
});

//CREATE
router.post("/", middleware.isLoggedIn, function(req, res) {
	//get data from form and add to campgrounds array
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var name = req.body.name;
	var image = req.body.image;
	var cost = req.body.cost;
	var description = req.body.description;
	var newCampground = {author: author, name: name, image: image, cost: cost, description: description};
	//Create a new campground and save to database
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//redirect back to index page
		res.redirect("/campgrounds");
		}
	});
});

//NEW
router.get("/new", middleware.isLoggedIn, (req,res) =>{
	res.render("campgrounds/new");
});

//SHOW - shows more information on one campground
router.get("/:id", function(req,res){
	//find the campground with ID and add the comments
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

//EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds")
		} else {
			res.render("campgrounds/edit", {campground: foundCampground});
		}
	});
});

//UPDATE
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

// DESTROY!!!!!!!!!
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
   });
});

module.exports = router;