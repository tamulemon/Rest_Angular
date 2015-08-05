 var express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		url = require('url'),
		port = process.env.port || 8080,
		mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/cat_dog');



//var catRouter = express.Router();
//require('./router/cat_router.js')(catRouter);
//
//app.use('/cats', catRouter);

app.use(express.static(__dirname + '/build'));

app.listen(port, function(){
	console.log('server is running');
});