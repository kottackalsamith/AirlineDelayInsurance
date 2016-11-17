System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[],
        execute: function() {
            exports_1("default",angular.module('insuranceCtrl', [])
                .controller('InsuranceController', function ($rootScope, $scope, $http) {
                console.log('insurance controller');
                $http.get('api/insured')
                    .then(function (response) {
                    $scope.content = response.data;
                    $scope.statuscode = response.status;
                    $scope.statustext = response.statustext;
                    $scope.content.forEach(function (data) {
                        if ($rootScope.userDetails.username == data.name) {
                            $scope.name = data.name;
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                });
            }));
        }
    }
});
//# sourceMappingURL=insuranceCtrl.js.map