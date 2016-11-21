// Registeration Page Controller
System.register(['../services/userService'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UserCreateController;
    return {
        setters:[
            function (_1) {}],
        execute: function() {
            // function userController(User, $location, $window){
            //         var vm = this;
            //         vm.singupUser = function(){
            //             vm.message = '';
            //             User.create(vm.userData)
            //                 .then(function(response){
            //                     vm.userData = {};
            //                     vm.message = response.data.message;
            //                     $window.localStorage.setItem('token', response.data.token);
            //                     $location.path('/');
            //                 });
            //         };
            //     }
            UserCreateController = (function () {
                function UserCreateController(User, $location, $window) {
                    this.User = User;
                    this.$location = $location;
                    this.$window = $window;
                }
                UserCreateController.prototype.signupUser = function () {
                    this.message = '';
                    this.User.create(this.userData)
                        .then(function (response) {
                        this.userData = {};
                        this.message = response.data.message;
                        this.$window.localStorage.setItem('token', response.data.token);
                        this.$location.path('/');
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