'use strict';

module.exports = function(app) {
	app.controller('catController', ['$scope', '$http', function($scope, $http) {
		$scope.cats = [];
		$scope.errors = [];

		$scope.getAll = function() { 
			$http.get('/cats/')
				.then(function(res) {
				$scope.cats = res.data;
			}, function(res) { 
				$scope.errors.push({msg: 'could not load cats'});
				console.log(res.data);
			});
		};
	
	}]);
};