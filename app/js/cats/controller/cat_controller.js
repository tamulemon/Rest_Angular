'use strict';

module.exports = function(app) {
	app.controller('catController', ['$scope', '$http', function($scope, $http) {
		$scope.cats = [];
		$scope.errors = [];
		var oldCat = null;
		
		$scope.getAll = function() { 
			$http.get('api/cats')
				.then(function(res) {
				$scope.cats = res.data;
			}, function(res) { 
				$scope.errors.push({msg: 'could not load cats'});
				console.log(res.data);
			});
		};
		
		$scope.createCat = function(newCat) { 
			$http.post('api/cats', newCat)
				.then(function(res) {
				newCat.edit = false;
				$scope.cats.push(newCat);
			}, function(res) { 
				$scope.errors.push({msg: 'could not create new cat'});
				newCat.edit = false;
				console.log(res.data);
			});
			$scope.newCat = null;
		};
		
		
		$scope.destroyCat = function(cat) { 
			$http.delete('api/cats/' + cat._id)
				.then(function(res) {
				$scope.cats.splice($scope.cats.indexOf(cat), 1);
			}, function(res) { 
				$scope.errors.push({msg: 'could not delete cat'});
				console.log(res.data);
			});
		};
	
		$scope.updateCat = function(cat) { 
			$http.put('api/cats/' + cat._id, cat)
				.then(function(res) {
				console.log('from the front', cat);
				$scope.cats.splice($scope.cats.indexOf(cat), 1, cat);
				cat.edit = false;
			}, function(res) { 
				$scope.errors.push({msg: 'could not delete cat'});
				cat.edit = false;
				console.log(res.data);
			});
		};
		
		
		$scope.editCat = function(cat) { 
			oldCat = cat;
			cat.edit= true;
			console.log('try edit', cat);
		};
		
		$scope.cancelCat = function(cat) { 
			console.log('scope oldcat', oldCat);
			cat = oldCat;
			cat.edit = false;
		};
		
	}]);
};