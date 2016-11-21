// Registeration Page Controller
System.register(['../services/userService'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[
            function (_1) {}],
        execute: function() {
            exports_1("default",angular.module('userCtrl', ['userService'])
                .controller('UserCreateController', function (User, $location, $window) {
                var vm = this;
                vm.singupUser = function () {
                    vm.message = '';
                    User.create(vm.userData)
                        .then(function (response) {
                        vm.userData = {};
                        vm.message = response.data.message;
                        $window.localStorage.setItem('token', response.data.token);
                        $location.path('/');
                    });
                };
            }));
        }
    }
});
//# sourceMappingURL=userCtrl.js.map