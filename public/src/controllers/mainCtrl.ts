// Controller for authentication check and logout

import '../services/authService';
class MainController {

    public processing;
    public error;
    public errorFlag;
    public loginData;
    public user;
    public loggedIn;
    public userDetails;

    static $inject = ['$rootScope', '$location', 'Auth'];

    constructor(private $rootScope: ng.IRootScopeService, private $location: ng.ILocationService, private Auth) {

    }


    public loggedInCheck() {
        let instance = this;
        this.loggedIn = this.Auth.isLoggedIn();
        this.$rootScope.$on('$routeChangeStart', function () {
            instance.loggedIn = instance.Auth.isLoggedIn();
            instance.Auth.getUser()
                .then(function (data) {
                    instance.user = data.data;
                    instance.$rootScope.userDetails = instance.user;
                });
        });

    }

    public doLogin() {
        let instance = this;
        this.processing = true;
        this.error = '';

        this.Auth.login(this.loginData.username, this.loginData.password)
            .success(function (data) {
                instance.processing = false;

                instance.Auth.getUser()
                    .then(function (data) {
                        instance.user = data.data;
                    });

                if (data.success) {
                    instance.$location.path('/');
                } else {
                    instance.error = data.message;
                    instance.errorFlag = true;
                    console.log(instance.error);
                }
            });
    }

    public doLogout() {
        this.Auth.logout();
        this.$location.path('logout');
    };

}



export default angular.module('mainCtrl', ['authService'])
    .controller('MainController', MainController);
