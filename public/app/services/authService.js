System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Authenticate, AuthenticateToken, AuthenticateInterceptor;
    function authenticate($http, $q, AuthToken) {
        return new Authenticate($http, $q, AuthToken);
    }
    function authenticateToken($window) {
        return new AuthenticateToken($window);
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
            if (response.status === 403) {
                $location.path('/login');
            }
            return $q.reject(response);
        };
        return interceptorFactory;
    }
    function authenticateInterceptor($q, $location, AuthToken) {
        return new AuthenticateInterceptor($q, $location, AuthToken);
    }
    return {
        setters:[],
        execute: function() {
            Authenticate = (function () {
                function Authenticate($http, $q, AuthToken) {
                    this.$http = $http;
                    this.$q = $q;
                    this.AuthToken = AuthToken;
                }
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
                Authenticate.prototype.logout = function () {
                    this.AuthToken.setToken();
                };
                Authenticate.prototype.isLoggedIn = function () {
                    if (this.AuthToken.getToken()) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
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
            AuthenticateToken = (function () {
                function AuthenticateToken($window) {
                    this.$window = $window;
                }
                AuthenticateToken.prototype.getToken = function () {
                    return this.$window.localStorage.getItem('token');
                };
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
            AuthenticateInterceptor = (function () {
                function AuthenticateInterceptor($q, $location, AuthToken) {
                    this.$q = $q;
                    this.$location = $location;
                    this.AuthToken = AuthToken;
                }
                AuthenticateInterceptor.prototype.request = function (config) {
                    this.token = this.AuthToken.getToken();
                    if (this.token) {
                        config.headers['x-access-token'] = this.token;
                    }
                    return config;
                };
                AuthenticateInterceptor.prototype.responseError = function (response) {
                    if (response.status === 403) {
                        this.$location.path('/login');
                    }
                    return this.$q.reject(response);
                };
                AuthenticateInterceptor.$inject = ['$q', '$location', 'AuthToken'];
                return AuthenticateInterceptor;
            }());
            exports_1("default",angular
                .module('authService', [])
                .factory('Auth', ['$http', '$q', 'AuthToken', authenticate])
                .factory('AuthToken', ['$window', authenticateToken])
                .factory('AuthInterceptor', ['$q', '$location', 'AuthToken', authInterceptor]));
        }
    }
});
//# sourceMappingURL=authService.js.map