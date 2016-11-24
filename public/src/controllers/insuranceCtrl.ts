// Controller for insurance tab
class InsuranceController {
    public content:any;
    public statustext:string;
    public statuscode:number;
    public name:string;

    static $inject = ['$rootScope', '$scope', '$http'];

    constructor(private $rootScope: ng.IRootScopeService, private $scope: ng.IScope, private $http: ng.IHttpService) {

    }

    // For loading the insurance details in the insurance page
    public Insurance():ng.IPromise<void> {
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