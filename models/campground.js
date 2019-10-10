var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectID,
			ref: "User"
		},
		username: String
	},
   name: String,
   image: String,
   description: String,
   cost: Number,
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
 
module.exports = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{name: "Granite Hill", image: "https://www.americansouthwest.net/new_mexico/photographs700/aguirre-hill.jpg", description: "This is a huge granite hill. You can look at it, touch, piss on it...I don't really care." }, function(err, campground) {
// 		if(err) {
// 			console.log(error);
// 		} else {
// 			console.log("Newly Created Campground: ");
// 			console.log(campground);
// 		}
// 	}
//)

// var campgrounds = [
// 		{name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2017/08/29/04/16/site-2692058_1280.jpg"},
// 		{name: "Granite Hill", image: "https://www.americansouthwest.net/new_mexico/photographs700/aguirre-			hill.jpg"},
// 		{name: "Yogi Bears", image: "https://cdn.pixabay.com/photo/2016/08/31/15/58/camping-on-beach-				1633957_1280.jpg"},
// 		{name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2017/08/29/04/16/site-2692058_1280.jpg"},
// 		{name: "Granite Hill", image: "https://www.americansouthwest.net/new_mexico/photographs700/aguirre-			hill.jpg"},
// 		{name: "Yogi Bears", image: "https://cdn.pixabay.com/photo/2016/08/31/15/58/camping-on-beach-				1633957_1280.jpg"}
// 	];

