/// <reference path="../_all.ts" />
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UserService;
    function userService($http) {
        var userFactory = {};
        userFactory.create = function (userData) {
            return $http.post('/api/signup', userData);
        };
        console.log(userFactory);
        return userFactory;
    }
    return {
        setters:[],
        execute: function() {
            UserService = (function () {
                function UserService($http) {
                    this.$http = $http;
                    this.userFactory = {};
                }
                UserService.prototype.create = function (userdata) {
                    return this.$http.post('/api/signup', userdata);
                };
                UserService.$inject = ['$http'];
                return UserService;
            }());
            exports_1("default",angular.module('userService', [])
                .factory('User', ['$http', userService]));
        }
    }
});
//# sourceMappingURL=userService.js.map