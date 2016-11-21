/// <reference path="../_all.ts" />
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UserService;
    function createUser($http) {
        return new UserService($http);
    }
    return {
        setters:[],
        execute: function() {
            // function userService($http) {
            //         var userFactory = {};
            //         userFactory.create = function(userData){
            //             return $http.post('/api/signup', userData);
            //         };
            //         console.log(userFactory);
            //         return userFactory;
            // }
            UserService = (function () {
                function UserService($http) {
                    this.$http = $http;
                    return;
                }
                UserService.prototype.create = function (userdata) {
                    console.log(userdata);
                    return this.$http.post('/api/signup', userdata);
                };
                return UserService;
            }());
            exports_1("default",angular.module('userService', [])
                .factory('User', ['$http', createUser]));
        }
    }
});
//# sourceMappingURL=userService.js.map