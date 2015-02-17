
//GENERIC onError FUNCTION
var onError = function(data, status) {
	console.log("status", status);
	console.log("error", data);
};

//MAKING A TWOTE
var $newForm = $("#new_tool");
$newForm.submit(function newTwote(event){
	event.preventDefault();
	var postData = {text:$("#twote_text").val(), 
					name:$(".loggedInUser").attr("name")};
	console.log(postData);

	$.post("newTwote", postData)
		.done(onSuccessNewTwote)
		.error(onError);
});
var onSuccessNewTwote = function(data, status){
	//make new twote appear
	console.log("making twote");
	var twote_disp = Handlebars.templates['twote_disp'];
	console.log(twote_disp(data));
	$('.twotesl').prepend(twote_disp(data));
	//$('#twote_user').prepend(twote_disp(data.user));

}; 

var $users = $('.users');
// var id = $('.users').attr('id').toString();
// var $userHighlight = $("#"+id);
// console.log($userHighlight);
$users.click(function highlight(event){
	event.preventDefault();
	// console.log($(this).attr("twotes"));
	// var twotes = $(this).attr('id');
	//var $twotesUsers = $('.twote_user');


	var name = undefined;
	for(i=0;i< $users.length; i++){
		name = $(this).attr('id');
	}
	console.log(name);
	console.log($("." + name));
	$("." + name).parent().toggleClass('highlight');
	$(this).toggleClass('highlight');

	//$("#twote_user").toggleClass('highlight');

	// console.log(id);
	// var id = $("#twote_user").attr("id")
	// $("." + id).toggleClass('highlight');

	// for(i=0; i< $twotesUsers.length; i++){
	// 	console.log($($twotesUsers[i]).attr('id'));
	// }

	// var postData = {clickedUserId: $(this).attr('id')};
	
	//$.post("highlight", postDat)

});

//LOGGING IN
// var $loginform = $("#login");
// var onSuccessOut = function(data, status) {

// 	console.log($('div'));

// 	$('#welcome').html(data.name);
// 	$('#username')
// 	.not(':button, :submit, :reset, :hidden')
// 	.val('')
// 	.removeAttr('checked')
// 	.removeAttr('selected');


// };
// $loginform.submit(function login(event){
// 	event.preventDefault();
// 	console.log($('#username').val());
// 	var postData = {username: $('#username').val()};
	
// 	$.post("login", postData)
// 		.done(onSuccessOut)
// 		.error(onError);
// });

// $loginform.submit(function login(event){
// 	event.preventDefault();
// 	var postData = {id:$(this).attr("id")};
// 	$.post("ingredients", postData)
// 		.done(onSuccessOut)
// 		.error(onError);
// });


//RESOLVING AN ORDER
var $removeOrdBut = $(".removeOrder");
var onSuccessDelOrd = function(data, status){
	$currentLI = $("#"+data._id);
	$currentLI.remove();
	console.log(data);
}
$removeOrdBut.click(function resolveOrder(event){
	event.preventDefault();
	var postData = {id: $(this).parent().attr("id")};
	
	$.post("delOrd", postData)
		.done(onSuccessDelOrd)
		.error(onError);
});


//EDIT NAME OF AN INGREDIENT
var $editNameBut = $(".editName");
var onSuccessName = function(data,status){
	$currentForm = $("#"+data._id);
	editedName = data.name;
	var newName = $currentForm.find("span.nameSpan").html("Name: "+ editedName);

}
$editNameBut.click(function editName(event){
	event.preventDefault();
	var postData = {name: $(this).parent()
					.find("input.nameText")
					.val(), id: $(this).parent().attr("id")};
	$.post("newName", postData)
		.done(onSuccessName)
		.error(onError);
});




//EDIT PRICE OF AN INGREDIENT
var $editPriceBut = $(".editPrice");
var onSuccessPrice = function(data,status){
	$currentFormP = $("#"+ data._id);
	editedPrice = data.price;
	var newPrice = $currentFormP.find("span.priceSpan").html("Price: "+ editedPrice);
}
$editPriceBut.click(function editPrice(event){
	event.preventDefault();
	var postData = {price: $(this).parent()
					.find("input.priceText")
					.val(), id: $(this).parent().attr("id")};
	$.post("newPrice", postData)
		.done(onSuccessPrice)
		.error(onError);
});




//ADD NEW INGREDIENT 
var $formAdd = $(".new_form");

var onSuccessAddNew = function(data,status){
	console.log(data);
	$newForm = $("#"+data._id);
	$ingListUL = $("#inStock");
	$ingListUL.append($newForm);
	//$newForm.add();
}
$formAdd.submit(function addIngr(event){
	event.preventDefault();
	$addName = $("#addName").val();
	$addPrice = $("#addPrice").val();
	var postData = {name: $addName, price: $addPrice};
	$.post("addNew", postData)
		.done(onSuccessAddNew)
		.error(onError);
});




//UPDATE RUNNING TOTAL COST ON ORDER PAGE
var $checkForm = $(".new_order");
var total = 0;
var onSuccessCheck = function(data,status){
	var checkedPrice = data.price;
	var current = $("span#totalcost").val();
	//console.log(checkedPrice);
	total+=checkedPrice;
	//console.log(total);
	$("span#totalcost").html(total);
}

$(".checkbox").change(function addCost(){

	if($(this).is(":checked")){
		//console.log($(this));
		var postData = {id: $(this).attr("id")};
		$.post("check", postData)
			.done(onSuccessCheck)
			.error(onError);
	}
});




//HANDLING A SUBMITTED ORDER
var onSuccessNewOrder = function(data, status){
	console.log("new order made");
}

$checkForm.submit(function submitOrder(event){
	event.preventDefault();
	$customerName = $("#customerName").val();
	var val = [];
	var names = [];
	$("input:checked").each(function(i){
		val[i] = $(this).attr("id");
		names[i] = $(this).attr("name");
	});
	// console.log($customerName);
	// console.log(val);
	// console.log(names);
	val1 = val.toString(); //for some reason, can't send arrays over to index.js
	names1 = names.toString();
	var postData = {idArr: val1, 
		namesIngArr: names1,
		customer: $customerName};
	console.log(names1);
	$.post("newOrder", postData)
		.done(onSuccessNewOrder)
		.error(onError);
});





