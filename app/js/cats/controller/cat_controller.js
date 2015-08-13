'use strict';

module.exports = function(app) {
	app.controller('catController', ['$scope', '$http', 'relationshipService', function($scope, $http, relService) {
		$scope.cats = [];
		$scope.errors = [];
		var oldCat = {};
		
		var Relationship = new relService('cats');
		
		
		$scope.getAll = function() { 
			$http.get('api/cats')
				.then(function(res) {
				$scope.cats = res.data;
			}, function(res) { 
				$scope.errors.push({msg: 'could not load cats'});
				console.log(res.data);
			});
		};
		
		$scope.showDetail= function(cat) {
			if(!cat.showDetail) {
				cat.showDetail = true;
			}
			else {
				cat.showDetail = false;
			}
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
//			console.log('before edit', cat);
			for(var key in cat) {
				oldCat[key] = cat[key];
			}
//			console.log('old cat', oldCat);
			cat.edit= true;
		};
		
		$scope.cancelCat = function(cat) { 
//			$scope.updateForm[cat._id].$rollbackViewValue();
			for(var key in cat) { // cat has key 'edit', but oldCat doesn't have this property. If use for(var key in oldCat), the edit will still be true. 
				cat[key] = oldCat[key];
			}
//			console.log('cat after cancel', cat);
		};
		
		$scope.showFriend = function(cat) {
			Relationship.showAvailable(cat, 'friend');
		};
		
		$scope.addFriend = function(cat, friend) {
//			console.log('addFriend funtion envoked');
			Relationship.addRelationship(cat, 'friends', 'Cat', friend, function(err, data) {
				if(err) {
					$scope.errors.push(err);
				}else {
					console.log('data back to controller');
					cat.friends.push(friend);
					$scope.cats.splice($scope.cats.indexOf(cat), 1, cat);
				}
			});
		};
		
	}]);
};