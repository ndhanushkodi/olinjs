//I DON'T REALLY USE THE INGREDIENTS PROPERTY OF THIS
//MY BAD, BUT I DIDN'T GO BACK AND REMOVE IT IN THE
//END
var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
	customer: String,
	ingredients: Array,
	ingredientsListOut: Array
});

module.exports = mongoose.model('Order', orderSchema);