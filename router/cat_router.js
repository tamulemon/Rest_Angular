var express = require('express'),
		catRouter = express.Router(), //creates a router as a module, loads a middleware 
		mongoose = require('mongoose'),
		Cat = require('../model/cats.js'),
		Dog = require('../model/dogs.js'),
		bodyParser = require('body-parser');

exports.catRouter = function(router) {
	
	router.use(bodyParser.json());
	router.user(bodyParser.urlencoded({extended:true}));

		router.route('/')
		// view all cats
		.get(function(req, res) {
			Cat.find({}, function(err, data) {
				if (err) {
					res.json(errorHandler(err)(500, 'retrieve cats.'));
				}
				else {
					res.json(data);
				}
			});
		})
		// add a new cat
		.post(function(req, res) {
			var cat = new Cat(req.body);
			cat.save(cat, function(err) {
				if (err) {
					res.json(errorHandler(err)(500, 'create cat.'));
				} 
				else {
					res.json({msg: 'Cat is successfully saved.'});
				}
			})
		});


		// query a cat by name
	router.route('/:catName')
		.get(function(req, res) {
				Cat.find({name: req.params.catName})
				.populate('enemies')
					.exec(function(err, cat) {
					if (err) {
						res.json(errorHandler(err)(500, 'retrieve the cat.'));
					}
					else {
					res.json(data);
					}
				})		
			})
		// update a cat by name, will insert if the name doesn't exist
		.put(function(req, res) {
			Cat.update({name: req.params.catName}, {$set: req.body}, {upsert:true, multi:true}, function(err) {
				if (err) {
					res.json(errorHandler(err)(500, 'update cat.'));
				} 
				else {
					res.json({msg: 'Cat is successfully updated.'});
				}
			});
		})
		// delete by name
		.delete(function(req, res) {
			Cat.remove({name: req.params.catName}, function(err) {
				if (err) {
					res.json(errorHandler(err)(500, 'delete cat.'));
				} 
				else {
					res.json({msg: 'Cat is successfully updated.'});
				}
			});
		});

		// add a friend: use $push to push an object to friends array. multiple : true. 
	router.route('/:catName/addfriend')
			.put(function(req, res) {
			Cat.update({name: req.params.catName}, {$push: {friends: req.body}}, {upsert: false, multi:true}, function(err) {
				// options, need to be grouped in {}
				if (err) {
					res.json(errorHandler(err)(500, 'add friend to the cat'));
				} 
				else {
					res.json({msg: 'Friend is successfully added.'});
				}
			});
		});

	// fetch a dob by the name and add dog._id to the cat
	router.route('/:catName/addenemy')
		.put(function(req, res) {
			fetchDog(req.body.name, updateCat);

			var fetchDog = function(dogName, callback){
				Dog.find({name: dogName}, function(err, data) {
					if (err) {
						callback(err);
					}
					else {
						callback(null, data);
					}
				});
			};

			var updateCat = function(err, dogData) {
				if(err) {
					res.json(errorHandler(err)(500, 'find the enemy dog.'));
				} 
				else {
					var dogIDs = [];
					dogData.forEach(function(adog) {
						dogIDs.push(adog._id);
					});

					if(dogIDs.length === 0) {
						res.json({msg: 'There is not dog with such name'});
						return;
					}

					Cat.update({name: req.params.catName}, {$pushAll: {enemies: dogIDs}}, {multi: true}, function(err, catData) {
						if (err) {
							res.json(errorHandler(err)(500, 'add enemy to the cat.'));
						} 
						else {
							res.json({msg: 'Enemy is successfully added.'});
						}
					});
				}
			};
		});
	// error handling
	function errorHandler(error) {
		console.log(error);
		return function(statusCode, message){
			return ({status: statusCode, msg: "Server error. Couldn't " + message});
		}
	};

};
