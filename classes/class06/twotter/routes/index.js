var mongoose = require('mongoose');
var routes = {};
var User = require('./../models/userModel.js');
var Twote = require('./../models/twoteModel.js');


routes.showLogin = function(req,res){
	res.render("login");
}

routes.login = function(req, res){
	console.dir(req.cookies);
	console.dir(req.session);
	var message;

	User.findOne({name: req.body.name}, function(err,user){
		if(err){
			res.status(500).json({error:'Something crashed while finding user'});
		}
		if(!user){
			var newUser = new User({name:req.body.name,
				twotes:[]});

			newUser.save(function(err){
				if(err){
					res.status(500).json({error:'Something crashed while saving user'});
				}
				
				else{
					req.session.name = newUser;
					req.session.save();
					console.log('NEW USER ALERT');
					console.log(newUser);
					res.redirect('/main');
					
				}
			});
		}
		else{
			
			req.session.name = user;
			req.session.save();
			console.log(user);
			res.redirect('/main');
		}
		//res.redirect("/main");
	});

}


routes.ingredientNewName = function(req,res){
	var id = req.body.id;
	var newName = req.body.name;

	Ingredient.update({"_id": id}, {$set: {name: newName}}, function(err){
		if(err){
			console.log("can't update name");
		}
		Ingredient.find({"_id":id}, function(err, ing){
			if(err){
				console.log("can't find");
			}
			console.log(ing[0]);
			res.json(ing[0]);
		});
	});

}



routes.newTwote = function(req,res){
	var text = req.body.text;
	var name = req.body.name;

	var newTwote = new Twote({user:name, text:text});

	newTwote.save(function(err){
		if(err){
			res.status(500).json({error:'Something crashed while saving twote'});
		}
		
		User.findOne({name:name}, function(err,user){
			if(err){
				res.status(500).json({error:'Something crashed while finding user'});	
			}
			var twotesArr = user.twotes;
			twotesArr.push(newTwote);

			User.update({name:name}, {$set:{twotes:twotesArr}}, function(err){
				if(err){
					res.status(500).json({error:'Something crashed while finding user'});	
				}

				console.log(user.twotes);
				res.json(newTwote);

			});
			
		});
		

	});

}

//render_info has users, loggedInUser, twotes
routes.twotter = function(req,res){
	var render_info = {}
	render_info.loggedInUser = req.session.name;
	console.log("LOGGED IN USERR");
	console.log(render_info.loggedInUser);
	User.find({}, function(err,users){
		if(err){
			res.status(500).json({error:'Something crashed while finding user'});
		}
		render_info.users=users;
		//console.log(render_info.users);

		Twote.find({}, function(err, twotes){
			if(err){
				res.status(500).json({error:'Something crashed while finding user'});
			}
			render_info.twotes=twotes;
			res.render("twotter", render_info);
		})

		
	});
	
	//, {sort:{"_id":1}},

	
	//console.log(req.session.user)
	
}




//HOME DOES NOTHING REALLY BUT TELL YOU WHERE TO GO
routes.home = function(req, res){
	res.render("home");
}

//ROUTE TO ADD A NEW INGREDIENT FROM AJAX FORM
routes.newIngredient = function(req,res){
	var addName = req.body.name;
	var addPrice = req.body.price;

	var newIngredient1 = new Ingredient({name:addName, 
		price:addPrice,
		stock: true});

	newIngredient1.save(function(err){
		if(err){
			console.log("couldn't save new ingr", err);
		}
		console.log(newIngredient1);
		res.json(newIngredient1);
	});
}

//JUST AN INITIAL ADD METHOD TO ADD 3 INGREDIENTS
//TO START WITH
routes.add = function(req,res){
	var nIngredient1 = new Ingredient({name:'tomato',
		price: 3.25,
		stock: true});
	nIngredient1.save(function(err){
		if(err){
			console.log("problem saving ingredient", err);
		}

		var nIngredient2 = new Ingredient({name:'patty',
			price: 1.00,
			stock: true});
		nIngredient2.save(function(err){
			if(err){
				console.log("problem saving ingredient", err);
			}

			var nIngredient3 = new Ingredient({name:'lettuce',
				price: 0.25,
				stock: true});
			nIngredient3.save(function(err){
			if(err){
				console.log("problem saving ingredient", err);
			}

			res.render("home", {'message': 'added ingredients'});
			});
		});
	});
}

//LISTS ALL THE INGREDIENTS THAT ARE IN STOCK
routes.ingredients = function(req,res){
	Ingredient.find({stock:true},function(err, ingredients){
		if(err){
			console.log("No ingredients", err);
		}
		res.render("ingredients", {ingList:ingredients});
	});
}

//LISTS INGREDIENTS FOR ORDER PAGE
routes.order = function(req,res){
	Ingredient.find(function(err, ingredients){
		if(err){
			console.log("No ingredients", err);
		}
		console.log(ingredients);
		res.render("order", {ingListAll:ingredients});
	});
}

//LISTS PENDING ORDERS
routes.kitchen = function(req,res){
	Order.find(function(err, orders){
		if(err){
			console.log("no orders", err);
		}
		res.render("kitchen", {orderList:orders});
	});
}

//UPDATE THE RUNNING COST OF AN ORDER
routes.buildCost = function(req,res){
	var idIng = req.body.id;
	Ingredient.findOne({"_id": idIng}, function(err, ing){
		if(err){
			console.log("can't find", err)
		}
		res.json(ing);
	});
}

//SAVES THE ORDER TO THE DATABASE ONCE IT'S SUBMITTED
routes.makeOrder = function(req,res){
	var idArr = req.body.idArr;
	var namesIngArr = req.body.namesIngArr;
	var customer = req.body.customer;
	// console.log(req.body);

	var newidArr = idArr.split(",");
	var newnamesIngArr = namesIngArr.split(",");
	// console.log(newidArr);
	// console.log(newnamesIngArr);
	// console.log(customer);
	Ingredient.find({'_id': {$in: newidArr}}, function(err, ingList){
		if(err){
			console.log("cant find them");
		}
		var newOrder = new Order({customer: customer, 
			ingredients: ingList,
			ingredientsListOut: namesIngArr});
		newOrder.save(function(err){
			if(err){
				console.log("can't save order", err);
			}
			console.log(newOrder);
			res.json(newOrder);
			
		});	
	});


}

//SETS STOCK TO FALSE WHEN OUT OF STOCK
routes.ingredientsOut = function(req,res){
	var id = req.body.id;
	console.log(id);

	Ingredient.update({"_id": id}, {$set: {stock: false}}, function(err, ingr){
		if(err){
			console.log("can't update");
		}
		Ingredient.find({"_id":id}, function(err, ing){
			if(err){
				console.log("can't find");
			}
			console.log(ing[0]);
			res.json(ing[0]);
		});

	});
}

//RESOLVES AND REMOVES THE ORDER FROM THE KITCHEN PAGE
routes.resolveOrder = function(req,res){
	var id = req.body.id;
	Order.findOneAndRemove({"_id": id}, function(err, ord){
		if(err){
			console.log("can't resolve");
		}
		console.log(ord);
		res.json(ord);
	});
}

//EDITS THE NAME OF AN INGREDIENT
routes.ingredientNewName = function(req,res){
	var id = req.body.id;
	var newName = req.body.name;

	Ingredient.update({"_id": id}, {$set: {name: newName}}, function(err){
		if(err){
			console.log("can't update name");
		}
		Ingredient.find({"_id":id}, function(err, ing){
			if(err){
				console.log("can't find");
			}
			console.log(ing[0]);
			res.json(ing[0]);
		});
	});

}

//EDITS THE PRICE OF AN INGREDIENT
routes.ingredientNewPrice = function(req,res){
	var id = req.body.id;
	var newPrice = req.body.price;

	Ingredient.update({"_id": id}, {$set: {price: newPrice}}, function(err){
		if(err){
			console.log("can't update price");
		}
		Ingredient.find({"_id":id}, function(err, ing){
			if(err){
				console.log("can't find");
			}
			console.log(ing[0]);
			res.json(ing[0]);
		});
	});

}

module.exports = routes;
