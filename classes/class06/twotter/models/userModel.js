var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
	name: String,
	twotes: Array
});

module.exports = mongoose.model('User', userSchema);

