/// <reference path="_all.ts" />
System.register(['angular', 'angular-route'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var angular;
    function rootCtrl($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
            templateUrl: 'app/views/pages/home.html',
            controller: 'MainController',
            controllerAs: 'main'
        })
            .when('/login', {
            templateUrl: 'app/views/pages/login.html'
        })
            .when('/signup', {
            templateUrl: 'app/views/pages/signup.html'
        })
            .when('/insured', {
            templateUrl: 'app/views/pages/insured.html'
        });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
    return {
        setters:[
            function (angular_1) {
                angular = angular_1;
            },
            function (_1) {}],
        execute: function() {
            exports_1("default",angular.module('appRoutes', ['ngRoute'])
                .config(rootCtrl));
        }
    }
});
//# sourceMappingURL=app.routes.js.map