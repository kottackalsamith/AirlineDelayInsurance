
// Registeration Page Controller

/// <reference path="../_all.ts" />

import '../services/userService';


class UserCreateController {
    public message: string;
    public userData:Object;


    static $inject = ['User', '$location', '$window'];

    constructor(private User, private $location: ng.ILocationService, private $window: ng.IWindowService) {
    }

    // For User Registeration
    public signupUser():void {
        this.message = '';
        let instance = this;
        console.log(this.userData);
        this.User.create(this.userData)
            .then(function (response) {
               instance.userData = {};
               instance.message = response.data.message;
               instance.$window.localStorage.setItem('token', response.data.token);
               instance.$location.path('/');
            });
    }
}

export default angular.module('userCtrl', ['userService'])
    .controller('UserCreateController', UserCreateController);
