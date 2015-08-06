'use strict';

module.exports = function(app) {
	app.controller('catController', ['$scope', '$http', function($scope, $http) {
		$scope.cats = [];
		$scope.errors = [];
		var oldCat = {};
		
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
				$scope.cats.splice($scope.cats.indexOf(cat), 1, cat);
				cat.edit = false;
			}, function(res) { 
				$scope.errors.push({msg: 'could not delete cat'});
				cat.edit = false;
				console.log(res.data);
			});
		};
		
// the following functions when bound to 'Edit'button and 'Cancel' button will fullfill what Tyler was asking for : cancel the editing when hit cancel button
		// remember that object is passed by referece, so if just do a cat = oldCat will not do the job.
		// And, I can not assign a new 'cat' because I will lose the reference to the original 'cat' that is bound to the form
		// the old way to do it is to copy all properties back
		
		$scope.editCat = function(cat) { 
			console.log('before edit', cat);
			for(var key in cat) {
				oldCat[key] = cat[key];
			}
			cat.edit= true;
			console.log('oldCat', oldCat);
		};
		
		$scope.cancelCat = function(cat) { 
//			$scope.updateForm[cat._id].$rollbackViewValue();
			for(var key in cat) {
				cat[key] = oldCat[key];
			}
			console.log('cat after cancel', cat);
		};
		
	}]);
};