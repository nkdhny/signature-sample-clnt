
var cursorX;
var cursorY;

document.onmousemove = function(e){
    cursorX = e.clientX;
    cursorY = e.clientY;
}



function scheduleMouseThief() {

	var timeout = 1000; //millis
	var apiMethod = "http://localhost/api/mouse"

	var thief = window.setInterval(function() {
		if($.cookie("sessionId")){
			$.ajax({
				url: apiMethod+"?sessionid="+$.cookie("sessionId"),
				type: 'PUT',
				data: {x: cursorX, y: cursorY},
				dataType: 'json'					
			})
		} else {
			window.clearInterval(thief);		
		}	
	}, timeout)

}

$( "#signin-submit" ).click(function() {
	var apiMethod = "http://localhost/api/session"; 
	var q = $.ajax({
		url: apiMethod, 
		data: {
			username: $( "input.username" ).val(), 
			password: $( "input.password" ).val()
		},
		dataType: "json",
		contentType: 'application/json'
	});
	q.done(function(resp) {
		if(resp.sessionId) {		
			$.cookie("sessionId", resp.sessionId);
			$("#authFailed").addClass('hide');
			$("#modalAuth").modal('hide');
			scheduleMouseThief();
		} else {
			$("#authFailed").removeClass('hide');
		}	
	});
	q.fail(function(){
		$("#authFailed").removeClass('hide');
	});  	
});


