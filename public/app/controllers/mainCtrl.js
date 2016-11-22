// Controller for authentication check and logout
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function mainController($rootScope, $location, Auth) {
        var vm = this;
        vm.loggedIn = Auth.isLoggedIn();
        $rootScope.$on('$routeChangeStart', function () {
            vm.loggedIn = Auth.isLoggedIn();
            Auth.getUser()
                .then(function (data) {
                vm.user = data.data;
                $rootScope.userDetails = vm.user;
            });
        });
        vm.doLogin = function () {
            vm.processing = true;
            vm.error = '';
            Auth.login(vm.loginData.username, vm.loginData.password)
                .success(function (data) {
                vm.processing = false;
                Auth.getUser()
                    .then(function (data) {
                    vm.user = data.data;
                });
                if (data.success) {
                    $location.path('/');
                }
                else {
                    vm.error = data.message;
                    vm.errorFlag = true;
                    console.log(vm.error);
                }
            });
        };
        vm.doLogout = function () {
            Auth.logout();
            $location.path('logout');
        };
    }
    return {
        setters:[],
        execute: function() {
            exports_1("default",angular.module('mainCtrl', [])
                .controller('MainController', mainController));
        }
    }
});
//# sourceMappingURL=mainCtrl.js.map