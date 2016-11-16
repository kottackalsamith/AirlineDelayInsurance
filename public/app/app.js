System.register(['angular', './maincontroller'], function(exports_1, context_1) {
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
            angular
                .module('AirlineInsuranceApp', [])
                .controller('MainController', maincontroller_1.MainController);
            angular
                .bootstrap(document.documentElement, ['AirlineInsuranceApp']);
        }
    }
});
//# sourceMappingURL=app.js.map