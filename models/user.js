var mongoose                = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose")
    
var userSchema = new mongoose.Schema({
    username:{type:String , unique:true, required:true},
    password:String,
    email:String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isAdmin:{type:Boolean, default:false}
});    

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", userSchema);