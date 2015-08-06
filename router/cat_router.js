var Cat = require('../model/cats.js'),
		Dog = require('../model/dogs.js'),
		bodyParser = require('body-parser');

module.exports = function(router) {	
	router.use(bodyParser.json());
	router.use(bodyParser.urlencoded({extended:true}));

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
	router.route('/:catId')
		.get(function(req, res) {
				Cat.findOne({_id: req.params.catId})
				.populate('enemies')
					.exec(function(err, cat) {
					if (err) {
						res.json(errorHandler(err)(500, 'retrieve the cat.'));
					}
					else {
					res.json(cat);
					}
				})		
			})
		// update a cat by name, will insert if the name doesn't exist
		.put(function(req, res) {
		Cat.update({_id: req.params.catId}, {$set: req.body}, {upsert:true}, function(err) {
			console.log('update route envoked with request', req.body);
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
		Cat.remove({_id: req.params.catId}, function(err) {
				if (err) {
					res.json(errorHandler(err)(500, 'delete cat.'));
				} 
				else {
					res.json({msg: 'Cat is successfully deleted.'});
				}
			});
		});

		// add a friend: use $push to push an object to friends array. multiple : true. 
	router.route('/:catId/addfriend')
		.put(function(req, res) {
			Cat.update({_id: req.params.catId}, {$push: {friends: req.body}}, {upsert: false}, function(err) {
				if (err) {
					res.json(errorHandler(err)(500, 'add friend to the cat'));
				} 
				else {
					res.json({msg: 'Friend is successfully added.'});
				}
			});
		});

	// fetch a dob by the name and add dog._id to the cat
	router.route('/:catId/addenemy')
		.put(function(req, res) {
			fetchDog(req.body._id, updateCat);

			var fetchDog = function(dogName, callback){
				Dog.findOne({_id:req.body._id}, function(err, dog) {
					if (err) {
						callback(err);
					}
					else if(!dog) {
						callback(null, false);
					}
					else {
						callback(null, dog);
					}
				});
			};

			var updateCat = function(err, dogData) {
				if(err) {
					res.json(errorHandler(err)(500, 'find the enemy dog.'));
				} 
				else if (!dagData) {
					res.json('Can not find this dog');
				}
				else {
					Cat.update({_id: req.params.catId}, {$push: {enemies: dogData._id}}, function(err, catData) {
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
