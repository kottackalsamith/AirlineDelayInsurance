// Registeration Page Controller
System.register(['../services/userService'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UserCreateController;
    return {
        setters:[
            function (_1) {}],
        execute: function() {
            UserCreateController = (function () {
                function UserCreateController(User, $location, $window) {
                    this.User = User;
                    this.$location = $location;
                    this.$window = $window;
                }
                // For User Registeration
                UserCreateController.prototype.signupUser = function () {
                    this.message = '';
                    var instance = this;
                    console.log(this.userData);
                    this.User.create(this.userData)
                        .then(function (response) {
                        instance.userData = {};
                        instance.message = response.data.message;
                        instance.$window.localStorage.setItem('token', response.data.token);
                        instance.$location.path('/');
                    });
                };
                UserCreateController.$inject = ['User', '$location', '$window'];
                return UserCreateController;
            }());
            exports_1("default",angular.module('userCtrl', ['userService'])
                .controller('UserCreateController', UserCreateController));
        }
    }
});
//# sourceMappingURL=userCtrl.js.map