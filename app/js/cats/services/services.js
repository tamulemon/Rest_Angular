var catServices = angular.module('catService', []);

require('./relationship_service.js')(catServices);

module.exports = catServices;

