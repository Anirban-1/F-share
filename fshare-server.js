const net = require('net');
const fs = require('fs');
var destAddr = process.argv[2], destPort = process.argv[3], sourceFile = process.argv[4];
const client = net.connect(destPort, destAddr, function(){
	var fileStream = fs.createReadStream(sourceFile);
	fileStream.on('error', function(err){
		console.log(err);
	});
	fileStream.on('open', function(){
		fileStream.pipe(client);
	});
	fileStream.on('close',function(){	// when the stream has been closed from the client end
		console.log("File sent successfully");
	});
});
