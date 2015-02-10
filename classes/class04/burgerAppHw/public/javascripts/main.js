
//GENERIC onError FUNCTION
var onError = function(data, status) {
	console.log("status", status);
	console.log("error", data);
};




//HANDLING OUT OF STOCK
var $form = $(".edit_form");
var onSuccessOut = function(data, status) {
	$currentForm = $("#"+data._id);
	$currentForm.remove();
	console.log(data);
};

$form.submit(function outOfStock(event){
	event.preventDefault();
	var postData = {id:$(this).attr("id")};
	$.post("ingredients", postData)
		.done(onSuccessOut)
		.error(onError);
});


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





