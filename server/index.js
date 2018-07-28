var express = require('express');
var app = express();
var server = require('http').Server(app);
var io =  require('socket.io')(server);

app.use(express.static('client'));

/*app.get('/', function(req,res){
	res.status(200).send('Este es un mensaje desde Node');
})*/

var messages = [
	{
		id: 1,
		text: 'Bienvenido al chat',
		nickname: 'Bot-Matmigo'
	}
];

io.on('connection', function(socket){
	console.log('El nodo con IP: ' + socket.handshake.address + ' se ha conectado.');

	socket.emit('messages',messages);

	socket.on('add-message',function(data){
		messages.push(data);
		io.sockets.emit('messages',messages);
	});
});

server.listen('6677',function(){
	console.log('Server start in 6677 port');
});
