'use strict';
require('angular/angular'); 

var catDogApp = angular.module('catDogApp', []);

require('./cats/cats.js')(catDogApp);