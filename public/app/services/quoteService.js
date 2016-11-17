System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[],
        execute: function() {
            exports_1("default",angular.module('quoteService', [])
                .factory('Quote', function ($http) {
                var quoteFactory = {};
                quoteFactory.create = function (quoteData) {
                    console.log(quoteData.name);
                    return $http.post('/api/quote', quoteData);
                };
                return quoteFactory;
            }));
        }
    }
});
//# sourceMappingURL=quoteService.js.map