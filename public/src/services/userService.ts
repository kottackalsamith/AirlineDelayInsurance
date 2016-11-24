/// <reference path="../_all.ts" />

interface UserServiceInterface {
    create(userdata: Object): ng.IHttpPromise<Object>;
}

class UserService implements UserServiceInterface {

    constructor(private $http: ng.IHttpService) {
        return;
    }

    // For user registeration
    create(userdata: Object):ng.IHttpPromise<Object> {
        console.log(userdata);
        return this.$http.post('/api/signup', userdata);
    }
}

function createUser($http: ng.IHttpService): UserService {
    return new UserService($http);
}


export default angular.module('userService', [])
    .factory('User', ['$http', createUser]);