'use strict';

require('../../app/js/client.js');
require('angular-mocks');

describe('catDogApp', function() {
	var $scope,
			$controller,
			$httpBackend;

	beforeEach(angular.mock.module('catDogApp'));
	
	beforeEach(angular.mock.inject(function(_$rootScope_, _$controller_) {
		$scope = _$rootScope_.$new();
		$controller = _$controller_;
		var catController = $controller('catController', { $scope: $scope });
	}));
	
	it('has variables on rootScope', function() {
		expect(Array.isArray($scope.cats)).toBe(true);
		expect(Array.isArray($scope.errors)).toBe(true);
		expect($scope.oldCat).toBeUndefined(); // oldCat variable is not attached to scope so undefined
		});
		
	describe('REST operations', function() {
		beforeEach(inject(function(_$httpBackend_, _$rootScope_) {
			$httpBackend = _$httpBackend_;
			$scope = _$rootScope_.$new();
			var catController = $controller('catController', { $scope: $scope }); // the last catController is consumed by the previous it evaluation(?)
		}));
		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});
		
		it('be able to make a get requestion', function() {
			$httpBackend.expectGET('api/cats').respond(200, [{_id:1, name:'Cutie', age: 2}, {_id:2, name: 'fluf', age:5, cuteness: 7}]);
			$scope.getAll();
			$httpBackend.flush();
			expect($scope.cats.length).toBe(2);
			expect($scope.cats[1]._id).toBe(2);
			expect($scope.cats[0].name).toBe('Cutie');
		});
		
		it('should be able to make a post request', function() {
			var newCat = {name: 'Meow', age:3, cuteness: 9};
			$scope.newCat = newCat;
			expect($scope.cats.length).toBe(0);
			$httpBackend.expectPOST('api/cats').respond(200);
			$scope.createCat(newCat);
			$httpBackend.flush();
			expect($scope.cats.length).toBe(1);
			expect($scope.cats[0].name).toBe('Meow');
			expect($scope.newCat).toBe(null);
		});
		
		it('should be able to make a delete request', function() {
			var catToDel = {_id:2, name: 'fluf', age:5, cuteness: 7};
			$scope.cats = [{_id:1, name:'Cutie', age: 2}, catToDel, {_id:5, name: 'Meow', age:3, cuteness: 9}];
			expect($scope.cats.length).toBe(3);
			$httpBackend.expectDELETE('api/cats/2').respond(200);
			$scope.destroyCat(catToDel);
			$httpBackend.flush();
			expect($scope.cats.length).toBe(2);
			expect($scope.cats[0].name).toBe('Cutie');
			expect($scope.cats[1].name).toBe('Meow');
			expect($scope.cats.indexOf(catToDel)).toBe(-1);
		});
	
		it('should be able to make an update request', function() {
			var catToUpdate = {_id:2, name: 'fluf', age:5, cuteness: 7};
			$scope.cats = [{_id:1, name:'Cutie', age: 2}, catToUpdate, {_id:5, name: 'Meow', age:3, cuteness: 9}];
			expect($scope.cats.length).toBe(3);
			$httpBackend.expectPUT('api/cats/2').respond(200);
			$scope.updateCat(catToUpdate);
			$httpBackend.flush();
			expect($scope.cats.length).toBe(3);
			expect($scope.cats[1].edit).toBe(false);
		});
		
		it('set a cat up for update when edit button is clicked', function() {
			var catToUpdate = {_id:2, name: 'fluf', age:5, cuteness: 7};
			$scope.cats = [{_id:1, name:'Cutie', age: 2}, catToUpdate, {_id:5, name: 'Meow', age:3, cuteness: 9}];
			$scope.editCat(catToUpdate);
			expect(catToUpdate.edit).toBe(true);
		});
		
		it('cancel update when the cancel button is clicked', function() {
			var catToUpdate = {_id:2, name: 'fluf', age:5, cuteness: 7};
			$scope.cats = [{_id:1, name:'Cutie', age: 2}, catToUpdate, {_id:5, name: 'Meow', age:3, cuteness: 9}];
			$scope.editCat(catToUpdate);
			$scope.cancelCat(catToUpdate);
			expect(catToUpdate.edit).toBeUndefined();
		});
		
	});
});




