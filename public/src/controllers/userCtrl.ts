
// Registeration Page Controller

/// <reference path="../_all.ts" />

import '../services/userService';

export default angular.module('userCtrl', ['userService'])
    .controller('UserCreateController', function(User, $location, $window){
        var vm = this;
        vm.singupUser = function(){
            vm.message = '';
            User.create(vm.userData)
                .then(function(response){
                    vm.userData = {};
                    vm.message = response.data.message;
                    $window.localStorage.setItem('token', response.data.token);
                    $location.path('/');
                });
        };
    });
