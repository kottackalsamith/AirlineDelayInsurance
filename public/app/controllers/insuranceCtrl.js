System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var InsuranceController;
    return {
        setters:[],
        execute: function() {
            // Controller for insurance tab
            InsuranceController = (function () {
                function InsuranceController($rootScope, $scope, $http) {
                    this.$rootScope = $rootScope;
                    this.$scope = $scope;
                    this.$http = $http;
                }
                // For loading the insurance details in the insurance page
                InsuranceController.prototype.Insurance = function () {
                    var _this = this;
                    return _this.$http.get('api/insured')
                        .then(function (response) {
                        _this.content = response.data;
                        _this.statuscode = response.status;
                        _this.statustext = response.statustext;
                        _this.content.forEach(function (data) {
                            if (_this.$rootScope.userDetails.username === data.name) {
                                _this.name = data.name;
                                return true;
                            }
                            else {
                                return false;
                            }
                        });
                    });
                };
                InsuranceController.$inject = ['$rootScope', '$scope', '$http'];
                return InsuranceController;
            }());
            exports_1("default",angular.module('insuranceCtrl', [])
                .controller('InsuranceController', InsuranceController));
        }
    }
});
//# sourceMappingURL=insuranceCtrl.js.map