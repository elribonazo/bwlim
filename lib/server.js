var express = require('express');
var fs = require('fs');
var Throttle = require('throttle');
/**
 * Expose `loadbwlim`.
 */
exports.bwlim = function loadbwlim(bandwidth){
	var download_limit = 0;

	download_limit = bandwidth;
	var app     = express();
	var port = 80;
	var server  = app.listen(port);
	
	app.get('*', function(req, res){
		var throttle = new Throttle(download_limit);
		console.log("requested " + req.path);
		if(!req.path) req.path = "index.html";
		var readStream = fs.createReadStream(__dirname + '/public' + req.path);
		console.log("downloading at " + download_limit / 1024 / 1024 / 8  + " MBps");
		readStream.on('open', function (err) {
		  readStream.pipe(throttle).pipe(res);
   	  });
		  
		  readStream.on('error', function(err) {
			  res.send("ERROR el fichero" + __dirname + '/public' + req.path + " no existe.");
		  }); 
	});

}