// Controller for authentication check and logout

import '../services/authService';
class MainController {

    public processing: boolean;
    public error: string;
    public errorFlag: boolean;
    public loginData: {
        username,
        password
    };
    public user: Object;
    
    public userDetails: string;

    static $inject = ['$rootScope', '$location', 'Auth'];

    constructor(private $rootScope: ng.IRootScopeService, private $location: ng.ILocationService, private Auth) {

    }

    public loggedIn:boolean = this.Auth.isLoggedIn(); // logged in check for redirection to insured page

    // For checking weather the user is logged in
    public loggedInCheck():void {
        let instance = this;
        this.$rootScope.$on('$routeChangeStart', function () {
            instance.loggedIn = instance.Auth.isLoggedIn();
            instance.Auth.getUser()
                .then(function (data) {
                    instance.user = data.data;
                    instance.$rootScope.userDetails = instance.user;
                });
        });

    }

    // For sign in
    public doLogin():void {
        let instance = this;
        this.processing = true;
        this.error = '';

        // Call login function in AuthService
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

    // For sign out
    public doLogout():void {
        this.Auth.logout();
        this.$location.path('logout');
    };

}



export default angular.module('mainCtrl', ['authService'])
    .controller('MainController', MainController);
