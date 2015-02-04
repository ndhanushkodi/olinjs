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


var $form = $(".edit_form");


// $form.val()
// var id = $(this).attr("id");
var onSuccessOut = function(data, status) {
	// var img = "<img src='"+data+"'/>";
	// $("#result").html(img);

	$currentForm = $("#"+data._id);
	$currentForm.remove();
	console.log(data);
};

var onError = function(data, status) {
	console.log("status", status);
	console.log("error", data);
};


$form.submit(function outOfStock(event){
	event.preventDefault();
	var postData = {id:$(this).attr("id")};
	$.post("ingredients", postData)
		.done(onSuccessOut)
		.error(onError);


});
//event.currentTarget ^^
