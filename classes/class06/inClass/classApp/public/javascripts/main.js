
//inside parentheses of jquery is selector
$('#hello-button1').click(function(){
    $.post('/hello', {
        text: 'data'
    })
    .done(function(data){
        $('body').append(data);
    })
    .error(console.error);
});