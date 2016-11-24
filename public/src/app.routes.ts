/// <reference path="_all.ts" />

// For routing of the pages

import * as angular from 'angular';

import 'angular-route';

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

export default angular.module('appRoutes', ['ngRoute'])
    .config(rootCtrl);