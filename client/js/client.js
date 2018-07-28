var socket;

$(document).ready(function (){

	//UI Default Values
	$('#nickname').val('Oscar Aceves');
	$('#message_text')[0].focus();



	// Socket IO 
	socket = io.connect('http://192.168.0.32:6677',{'forceNew':true});
	socket.on('messages',function(data){
		render(data);
	});


	//Events
	$('#sendMessage').on('click',function(e){
		e.preventDefault();
		addMessage(e);
	});

	$('#message_text').on('keypress',function(e){
		if (e.keyCode == 10){
			addMessage(e);
		}
	});
});

function render(data){

	$('#messages').html('');
	var html = data.map(function (message, index){
		return (`
			<div class='message'>
				<strong>${message.nickname}</strong>:
				<p>${message.text}</p>
			</div>
			<br/>
		`);
	}).join('');

	$('#messages').append(html);
	$('#messages')[0].scrollTop = $('#messages')[0].scrollHeight
}

function addMessage(e){

	var message = {
		nickname: $('#nickname').val(),
		text: $('#message_text')[0].value,
	};

	socket.emit('add-message',message);

	$('#message_text')[0].value = '';
	$('#message_text')[0].focus();

	return false;
}