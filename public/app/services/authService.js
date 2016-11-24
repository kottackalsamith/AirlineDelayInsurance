System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Authenticate, AuthenticateToken, AuthenticateInterceptor;
    // For returning the class because the factory returns a object
    function authenticate($http, $q, AuthToken) {
        return new Authenticate($http, $q, AuthToken);
    }
    // For returning the class because the factory returns a object
    function authenticateToken($window) {
        return new AuthenticateToken($window);
    }
    // For returning the class because the factory returns a object
    function authenticateInterceptor($q, $location, AuthToken) {
        return new AuthenticateInterceptor($q, $location, AuthToken);
    }
    return {
        setters:[],
        execute: function() {
            // For authentication
            Authenticate = (function () {
                function Authenticate($http, $q, AuthToken) {
                    this.$http = $http;
                    this.$q = $q;
                    this.AuthToken = AuthToken;
                }
                // For login
                Authenticate.prototype.login = function (username, password) {
                    var instance = this;
                    console.log(username + " " + password);
                    return this.$http.post('/api/login', {
                        username: username,
                        password: password
                    })
                        .success(function (data) {
                        instance.AuthToken.setToken(data.token);
                        return data;
                    });
                };
                // For logout
                Authenticate.prototype.logout = function () {
                    this.AuthToken.setToken();
                };
                // To check logged in or not
                Authenticate.prototype.isLoggedIn = function () {
                    if (this.AuthToken.getToken()) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                // For getting the logged in, user details
                Authenticate.prototype.getUser = function () {
                    if (this.AuthToken.getToken()) {
                        return this.$http.get('/api/me');
                    }
                    else {
                        return this.$q.reject({ message: "User has no token" });
                    }
                };
                Authenticate.$inject = ['$http', '$q', 'AuthToken'];
                return Authenticate;
            }());
            //  For setting and getting the token
            AuthenticateToken = (function () {
                function AuthenticateToken($window) {
                    this.$window = $window;
                }
                // To get the token from localStorage
                AuthenticateToken.prototype.getToken = function () {
                    return this.$window.localStorage.getItem('token');
                };
                // To set the token to localStorage
                AuthenticateToken.prototype.setToken = function (token) {
                    if (token) {
                        this.$window.localStorage.setItem('token', token);
                    }
                    else {
                        this.$window.localStorage.removeItem('token');
                    }
                };
                AuthenticateToken.$inject = ['$window'];
                return AuthenticateToken;
            }());
            // Authentication interceptor to set token to headers
            AuthenticateInterceptor = (function () {
                function AuthenticateInterceptor($q, $location, AuthToken) {
                    var _this = this;
                    this.$q = $q;
                    this.$location = $location;
                    this.AuthToken = AuthToken;
                    this.request = function (config) {
                        var token = _this.AuthToken.getToken();
                        if (token) {
                            config.headers['x-access-token'] = token;
                        }
                        return config;
                    };
                    this.responseError = function (response) {
                        if (response.status === 403) {
                            _this.$location.path('/login');
                        }
                        return _this.$q.reject(response);
                    };
                }
                AuthenticateInterceptor.$inject = ['$q', '$location', 'AuthToken'];
                return AuthenticateInterceptor;
            }());
            exports_1("default",angular
                .module('authService', [])
                .factory('Auth', ['$http', '$q', 'AuthToken', authenticate])
                .factory('AuthToken', ['$window', authenticateToken])
                .factory('AuthInterceptor', ['$q', '$location', 'AuthToken', authenticateInterceptor]));
        }
    }
});
//# sourceMappingURL=authService.js.map