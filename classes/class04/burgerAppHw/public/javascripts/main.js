// var $form = $("#ajax-form");
// $form.submit(function(event) {
//   event.preventDefault();
//   formData = $form.serialize();
//   // var mood = $form.find("[name='mood']:checked").val();
//   // var name = $form.find("[name='name']").val();
//   // formData = {
//   //   mood: mood,
//   //   name: name
//   // }
//   $.get("getCat", formData)
//     .done(onSuccess)
//     .error(onError);
// });

var onError = function(data, status) {
	console.log("status", status);
	console.log("error", data);
};




var $form = $(".edit_form");
// $form.val()
// var id = $(this).attr("id");
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
//event.currentTarget ^^
//var buttons = $form.find("button");




var $editNameBut = $(".editName");
var $editPriceBut = $(".editPrice");

var onSuccessName = function(data,status){
	$currentForm = $("#"+data._id);
	editedName = data.name;
	var newName = $currentForm.find("span.nameSpan").replaceWith("Name: "+ editedName);

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