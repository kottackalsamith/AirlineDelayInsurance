System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function auth($http, $q, AuthToken) {
        var authFactory = {};
        authFactory.login = function (username, password) {
            console.log(username + " " + password);
            return $http.post('/api/login', {
                username: username,
                password: password
            })
                .success(function (data) {
                AuthToken.setToken(data.token);
                return data;
            });
        };
        authFactory.logout = function () {
            AuthToken.setToken();
        };
        authFactory.isLoggedIn = function () {
            if (AuthToken.getToken()) {
                return true;
            }
            else {
                return false;
            }
        };
        authFactory.getUser = function () {
            if (AuthToken.getToken()) {
                return $http.get('/api/me');
            }
            else {
                return $q.reject({ message: "User has no token" });
            }
        };
        return authFactory;
    }
    function authToken($window) {
        var authTokenFactory = {};
        authTokenFactory.getToken = function () {
            return $window.localStorage.getItem('token');
        };
        authTokenFactory.setToken = function (token) {
            if (token) {
                $window.localStorage.setItem('token', token);
            }
            else {
                $window.localStorage.removeItem('token');
            }
        };
        return authTokenFactory;
    }
    function authInterceptor($q, $location, AuthToken) {
        var interceptorFactory = {};
        interceptorFactory.request = function (config) {
            var token = AuthToken.getToken();
            if (token) {
                config.headers['x-access-token'] = token;
            }
            return config;
        };
        interceptorFactory.responseError = function (response) {
            if (response.status == 403) {
                $location.path('/login');
            }
            return $q.reject(response);
        };
        return interceptorFactory;
    }
    return {
        setters:[],
        execute: function() {
            exports_1("default",angular
                .module('authService', [])
                .factory('Auth', auth)
                .factory('AuthToken', authToken)
                .factory('AuthInterceptor', authInterceptor));
        }
    }
});
//# sourceMappingURL=authService.js.map