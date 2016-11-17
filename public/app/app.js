/// <reference path="_all.ts" />
System.register(['angular', './app.routes', './controllers/mainCtrl', './services/authService', './controllers/userCtrl', './services/userService', './controllers/quoteCtrl', './controllers/insuranceCtrl'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var angular;
    return {
        setters:[
            function (angular_1) {
                angular = angular_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (_4) {},
            function (_5) {},
            function (_6) {},
            function (_7) {}],
        execute: function() {
            // Creating main app module and MainController
            angular.module('AirlineInsuranceApp', ['appRoutes', 'mainCtrl', 'authService', 'userCtrl', 'userService', 'quoteCtrl', 'insuranceCtrl'])
                .config(function ($httpProvider) {
                $httpProvider.interceptors.push('AuthInterceptor');
            });
            // Bootstrap the angular AirlineInsuranceApp module
            angular
                .bootstrap(document.documentElement, ['AirlineInsuranceApp']);
        }
    }
});
//# sourceMappingURL=app.js.map