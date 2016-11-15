"use strict";
var angular = require('angular');
var app = angular.module('helloApp', []);
function bootstrap(target) {
    angular.bootstrap(target, [app.name], { strictDi: true });
}
exports.bootstrap = bootstrap;
//# sourceMappingURL=app.js.map