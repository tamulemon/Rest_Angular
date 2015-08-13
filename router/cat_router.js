var Cat = require('../model/cats.js'),
		Dog = require('../model/dogs.js'),
		bodyParser = require('body-parser'),
		helper = require('./functions.js'),
		path = require('path');

module.exports = function(router) {	
	router.use(bodyParser.json());
	router.use(bodyParser.urlencoded({extended:true}));

		router.route('/')
		.get(function(req, res) {
			helper.fetchAll(Cat, res);
		})
		.post(function(req, res) {
			var cat = new Cat(req.body);
			cat.save(cat, function(err) {
				if (err) {
					res.json(errorHandler(err)(500, 'create cat.'));
				} 
				else {
					res.json({msg: 'Cat is successfully saved.'});
				}
			});
		});


		
	router.route('/:catId')
		.get(function(req, res) {
			helper.fetch(Cat, req.params.catId, function(err, cat) {
				if(err) {
					res.json(errorHandler(err)(500, 'find cat.'));
				} else {
				res.json(cat);
				}
			})
		})
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

	
//	function(model1, id1, relationship, model2, id2, callback) 
	router.route('/:catId/:relationship')
		.put(function(req, res) {
//		?&type=type&id=id'
			var type = req.query.type,
					Id = req.query.id;
		if (type === 'Cat') type = Cat;
		if (type === 'Dog') type = Dog;
			helper.updateRel(Cat, req.params.catId, req.params.relationship, type, Id, function(err, data) {
				console.log('helper.updateRel function is done, logged from cat router');
				if(err) {
					res.json(errorHandler(err)(500, 'update cat.'));
				} else if (!data) {
					res.json(errorHandler(err)(200, 'find cat.'));
				} else {
//					console.log('data in router', data);
					console.log('route success');
					res.json({msg: req.params.relationship + ' is successfully added.'});
				}
			})
		});
};
