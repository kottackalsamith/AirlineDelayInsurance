/// <reference path="../_all.ts" />

interface UserServiceInterface {
    create(userdata:Object):Object;
}

// function userService($http) {
   
//         var userFactory = {};
//         userFactory.create = function(userData){
//             return $http.post('/api/signup', userData);
//         };
//         console.log(userFactory);
//         return userFactory;
    
// }

class UserService implements UserServiceInterface {
    
    constructor(private $http: ng.IHttpService) {
        return;
    }
    create(userdata: Object): Object {
        console.log(userdata);
        return this.$http.post('/api/signup', userdata);
    }
}

 function createUser($http: ng.IHttpService) {
        return new  UserService($http);
    }


export default angular.module('userService', [])
    .factory('User', ['$http',createUser]);