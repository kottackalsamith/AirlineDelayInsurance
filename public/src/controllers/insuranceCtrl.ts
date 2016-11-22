// Controller for insurance tab

// function insuranceController($rootScope, $scope, $http) {
//     console.log('insurance controller');
//     var that = this;
//     $http.get('api/insured')
//         .then(function (response) {
//             that.content = response.data;
//             that.statuscode = response.status;
//             that.statustext = response.statustext;
//             that.content.forEach(function (data) {
//                 if ($rootScope.userDetails.username === data.name) {
//                     that.name = data.name;
//                     return true;
//                 }
//                 else {
//                     return false;
//                 }
//             });

//         });
// }

class InsuranceController {
    public content;
    public response;
    public statustext;
    public statuscode;
    public name;

    static $inject = ['$rootScope', '$scope', '$http'];

    constructor(private $rootScope: ng.IRootScopeService, private $scope: ng.IScope, private $http: ng.IHttpService) {

    }

    public Insurance() {
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
    }

}


export default angular.module('insuranceCtrl', [])
    .controller('InsuranceController', InsuranceController);