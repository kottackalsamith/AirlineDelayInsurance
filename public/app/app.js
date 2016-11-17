/// <reference path="_all.ts" />
System.register(['angular', './controllers/maincontroller'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var angular, maincontroller_1;
    return {
        setters:[
            function (angular_1) {
                angular = angular_1;
            },
            function (maincontroller_1_1) {
                maincontroller_1 = maincontroller_1_1;
            }],
        execute: function() {
            // Creating main app module and MainController
            angular
                .module('AirlineInsuranceApp', [])
                .controller('MainController', maincontroller_1.MainController);
            // Bootstrap the angular AirlineInsuranceApp module
            angular
                .bootstrap(document.documentElement, ['AirlineInsuranceApp']);
        }
    }
});
//# sourceMappingURL=app.js.map