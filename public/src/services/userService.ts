/// <reference path="../_all.ts" />

interface UserServiceInterface {
    userFactory: Object;
    create(userdata:Object):Object;
}

function userService($http) {
   
        var userFactory = {};
        userFactory.create = function(userData){
            return $http.post('/api/signup', userData);
        };
        console.log(userFactory);
        return userFactory;
    
}

class UserService implements UserServiceInterface {
    static $inject = ['$http'];

    userFactory: Object;

    constructor(private $http:ng.IHttpService){
        this.userFactory = {};
    }
    
    create(userdata:Object):Object{
        return this.$http.post('/api/signup', userdata);
    }

    
}

export default angular.module('userService', [])
    .factory('User', ['$http',userService]);