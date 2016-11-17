/// <reference path="_all.ts" />

import * as angular from 'angular';

import './app.routes';

import './controllers/mainCtrl';

import './services/authService';

import './controllers/userCtrl';

import './services/userService';

import './controllers/quoteCtrl';

import './controllers/insuranceCtrl';


// Creating main app module and MainController
angular.module('AirlineInsuranceApp', ['appRoutes', 'mainCtrl', 'authService', 'userCtrl', 'userService', 'quoteCtrl','insuranceCtrl'])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    });




// Bootstrap the angular AirlineInsuranceApp module
angular
    .bootstrap(document.documentElement, ['AirlineInsuranceApp']);



