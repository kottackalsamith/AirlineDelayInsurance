System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[],
        execute: function() {
            exports_1("default",angular.module('userService', [])
                .factory('User', function ($http) {
                var userFactory = {};
                userFactory.create = function (userData) {
                    return $http.post('/api/signup', userData);
                };
                return userFactory;
            }));
        }
    }
});
//# sourceMappingURL=userService.js.map