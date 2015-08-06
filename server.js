'use strict';

var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var express = require('express');
var app = express();

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/cat_dog');

var catRoutes = express.Router();
require('./router/cat_router.js')(catRoutes);


app.use(express.static(__dirname + '/build'));
app.use('/api/cats', catRoutes);

app.listen(port, function(){
	console.log('server is running ' + port);
});

