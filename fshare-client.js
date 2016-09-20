const net = require('net');
const fs = require('fs');
var fileName = 'receivedfile.'+process.argv[2];
const options = {
	allowHalfOpen : false,
	pauseOnConnect : false,
};
var fileCount = 0;

const server = net.createServer(options,function(listener){
	var fileStream = fs.createWriteStream(fileName);
	fileStream.on('error', function(err){
		console.log("File error ",err);
	});
	listener.pipe(fileStream);
	listener.on('finish',function(){
		console.log("Received file successfully");
		server.close(); // close the server on completion of the file transfer.
	});
});
server.listen(8001,function(){
	console.log("Client is waiting for the file on port 8001");
});
