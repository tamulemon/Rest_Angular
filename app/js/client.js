'use strict';
require('angular/angular'); 

var catDogApp = angular.module('catDogApp', ['catService']);

require('./cats/cats.js')(catDogApp);
require('./cats/services/services.js');