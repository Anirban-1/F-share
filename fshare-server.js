const net = require('net');
const fs = require('fs');
var destAddr = process.argv[2], destPort = process.argv[3], sourceFile = process.argv[4];
const client = net.connect(destPort, destAddr, function(){
	/*fs.readFile(sourceFile,function(err,data){
		if(data)
		{
			if(client.write(data)==true)
			{
				console.log("Data [ size: %d ] written succesfully",data.length);
				client.destroy();
			}
			else console.log("Data write failure");
		}
		else
			client.write("err");
	});
	*/
	var fileStream = fs.createReadStream(sourceFile);
	fileStream.on('error', function(err){
		console.log(err);
	});
	fileStream.on('open', function(){
		fileStream.pipe(client);
	});
});