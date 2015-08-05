'use strict'
require('Angular/Angular');

var catDogApp = angular.module('catDogApp', []);

var catController = catDogApp.controller('catController', [$scope, function($scope) {
	$scope.name = catName;
	$scope.cuteness = cuteness;
	$scope.friends = 'no friend yet';
	$scope.enimies = 'no enemy yet';
}]);