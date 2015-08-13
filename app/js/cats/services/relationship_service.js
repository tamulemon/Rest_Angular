module.exports = function(app) {
	app.factory('relationshipService', ['$http', function($http) {
		
		function errorHandler(callback) {
			return function(res) {
				console.log(res.data);
				callback(res.data);
			};
		}
		
		function successHandler(callback) {
			return function(res) {
				callback(null, res.data);
			};
		}
		
		return function(resourceName) {
			return {
					showAvailable : function(data, relationship) {
						if(!data[relationship]) {
							data[relationship] = true;
							console.log(data.friend);
						}else {
							data[relationship] = false;
						}
					},
				
					addRelationship: function(data1, relationship, Model, data2, callback) {
						console.log('relationship service envoked');
						$http({
							method: 'PUT',
							data: [data1, data2],
							url: 'api/' + resourceName + '/' + data1._id + '/' + relationship + '?type=' + Model + '&id=' + data2._id
						}).then(successHandler(callback), errorHandler(callback));
					}
				};
		};
			
//			router.route('/:catId/:relationship')
//				//		?type=type&id=id'
//				updateRel(Cat, req.params.catId, rq.params.relationship, type, Id, function(err, data) {

		
	}]);

};