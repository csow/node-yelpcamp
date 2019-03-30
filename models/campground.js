var mongoose = require("mongoose");
var campgroundsSchema = new mongoose.Schema({
   name:String,
   price:String,
   image:String,
   imageId:String,
   description:String,
   location:String,
   lat:Number,
   lng:Number,
   createdAt:{type:Date,default: Date.now},
   author:{
      id:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
      },
      username:String
   },
   comments :[
       {
           type:mongoose.Schema.Types.ObjectId,
           ref:"Comment"
       }
       ]
});

var Campgrounds = mongoose.model("Campgrounds", campgroundsSchema);
module.exports = Campgrounds;