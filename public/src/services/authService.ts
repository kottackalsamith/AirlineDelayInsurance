class Authenticate {

    public username: string;
    public password: string;

    static $inject = ['$http', '$q', 'AuthToken'];

    constructor(private $http: ng.IHttpService, private $q: ng.IQService, private AuthToken) {

    }
    public login(username, password) {

        let instance = this;

        console.log(instance.username + " " + instance.password);

        return this.$http.post('/api/login', {
            username: instance.username,
            password: instance.password
        })
            .success(function (data) {
                instance.AuthToken.setToken(data.token);
                return data;
            });
    }

    public logout() {
        this.AuthToken.setToken();
    }

    public isLoggedIn() {
        if (this.AuthToken.getToken()) {
            return true;
        } else {
            return false;
        }
    }

    public getUser() {
        if (this.AuthToken.getToken()) {
            return this.$http.get('/api/me');
        } else {
            return this.$q.reject({ message: "User has no token" });
        }
    }
}


function authenticate($http: ng.IHttpService, $q: ng.IQService, AuthToken) {
    return new Authenticate($http, $q, AuthToken);
}

class AuthenticateToken {

    static $inject = ['$window'];

    constructor(private $window: ng.IWindowService) {

    }

    public getToken() {
        return this.$window.localStorage.getItem('token');
    }

    public setToken(token) {

        if (token) {
            this.$window.localStorage.setItem('token', token);
        } else {
            this.$window.localStorage.removeItem('token');
        }
    }

}

function authenticateToken($window: ng.IWindowService) {
    return new AuthenticateToken($window);
}

class AuthenticateInterceptor {


    static $inject = ['$q', '$location', 'AuthToken'];

    constructor(private $q: ng.IQService, private $location: ng.ILocationService, private AuthToken) {

    }

    public request = (config) => {
        let token = this.AuthToken.getToken();

        if (token) {
            config.headers['x-access-token'] = token;
        }

        return config;
    }

    public responseError = (response) => {
        if (response.status === 403) {
            this.$location.path('/login');
        }
        return this.$q.reject(response);
    }

}


function authenticateInterceptor($q: ng.IQService, $location: ng.ILocationService, AuthToken) {
    return new AuthenticateInterceptor($q, $location, AuthToken);
}


export default angular
    .module('authService', [])
    .factory('Auth', ['$http', '$q', 'AuthToken', authenticate])
    .factory('AuthToken', ['$window', authenticateToken])
    .factory('AuthInterceptor', ['$q', '$location', 'AuthToken', authenticateInterceptor]);
