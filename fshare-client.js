const net = require('net');
const fs = require('fs');
var fileName = 'receivedfile.'+process.argv[2];
const options = {
	allowHalfOpen : false,
	pauseOnConnect : false,
};
var fileCount = 0;
/*const server = net.createServer(options,function(listener){
	listener.on('data',(data)=>{
		console.log("Data [ size: %d ] received",data.length);
		fs.writeFile(fileName,data,function(err){
			if(err)console.log("Error writing file to disk");
			else{
				console.log("Write successful");
				fileCount++;
				console.log("[ Files received =] %d",fileCount);
				console.log("Press Ctr+c to exit");
			}
		});
	});
}).listen(8001,()=>{
	console.log("Client is waiting for the file on port 8001");
});
*/

const server = net.createServer(options,function(listener){
	var fileStream = fs.createWriteStream(fileName);
	fileStream.on('error', function(err){
		console.log("File error ",err);
	});
	listener.pipe(fileStream);
	listener.on('finish',function(){
		//console.log("Write successful");
		console.log("Received file successfully");
	});
});
server.listen(8001,function(){
	console.log("Client is waiting for the file on port 8001");
});