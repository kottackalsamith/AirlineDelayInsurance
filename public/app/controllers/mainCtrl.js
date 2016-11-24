// Controller for authentication check and logout
System.register(['../services/authService'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MainController;
    return {
        setters:[
            function (_1) {}],
        execute: function() {
            MainController = (function () {
                function MainController($rootScope, $location, Auth) {
                    this.$rootScope = $rootScope;
                    this.$location = $location;
                    this.Auth = Auth;
                    this.loggedIn = this.Auth.isLoggedIn(); // logged in check for redirection to insured page
                }
                // For checking weather the user is logged in
                MainController.prototype.loggedInCheck = function () {
                    var instance = this;
                    this.$rootScope.$on('$routeChangeStart', function () {
                        instance.loggedIn = instance.Auth.isLoggedIn();
                        instance.Auth.getUser()
                            .then(function (data) {
                            instance.user = data.data;
                            instance.$rootScope.userDetails = instance.user;
                        });
                    });
                };
                // For sign in
                MainController.prototype.doLogin = function () {
                    var instance = this;
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
                        }
                        else {
                            instance.error = data.message;
                            instance.errorFlag = true;
                            console.log(instance.error);
                        }
                    });
                };
                // For sign out
                MainController.prototype.doLogout = function () {
                    this.Auth.logout();
                    this.$location.path('logout');
                };
                ;
                MainController.$inject = ['$rootScope', '$location', 'Auth'];
                return MainController;
            }());
            exports_1("default",angular.module('mainCtrl', ['authService'])
                .controller('MainController', MainController));
        }
    }
});
//# sourceMappingURL=mainCtrl.js.map