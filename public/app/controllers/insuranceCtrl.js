// Controller for insurance tab
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var InsuranceController;
    function insuranceController($rootScope, $scope, $http) {
        console.log('insurance controller');
        var that = this;
        $http.get('api/insured')
            .then(function (response) {
            that.content = response.data;
            that.statuscode = response.status;
            that.statustext = response.statustext;
            that.content.forEach(function (data) {
                if ($rootScope.userDetails.username === data.name) {
                    that.name = data.name;
                    return true;
                }
                else {
                    return false;
                }
            });
        });
    }
    return {
        setters:[],
        execute: function() {
            InsuranceController = (function () {
                function InsuranceController($rootScope, $scope, $http) {
                    this.$rootScope = $rootScope;
                    this.$scope = $scope;
                    this.$http = $http;
                }
                InsuranceController.prototype.getInsurance = function () {
                    var _this = this;
                    _this.$http.get('api/insured')
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