
// Registeration Page Controller

/// <reference path="../_all.ts" />

import '../services/userService';

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

class UserCreateController{
    message:String;
    static $inject = ['User','$location','$window'];    
    constructor( private User, private $location: ng.ILocationService, private $window : ng.IWindowService )
    {
       
    }
    public signupUser():void{
        this.message = '';
            this.User.create(this.userData)
                .then(function(response: ng.IHttpPromiseCallbackArg<any>){
                    this.userData = {};
                    this.message = response.data.message;
                    this.$window.localStorage.setItem('token', response.data.token);
                    this.$location.path('/');
                });
        }

}

export default angular.module('userCtrl', ['userService'])
    .controller('UserCreateController', UserCreateController);
