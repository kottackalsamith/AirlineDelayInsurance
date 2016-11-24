System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var QuoteCreateController;
    return {
        setters:[],
        execute: function() {
            QuoteCreateController = (function () {
                function QuoteCreateController($http, $filter, $rootScope, Auth) {
                    this.$http = $http;
                    this.$filter = $filter;
                    this.$rootScope = $rootScope;
                    this.Auth = Auth;
                    this.sourceList = [{
                            "id": 1,
                            "place": "Trivandrum"
                        }, {
                            "id": 2,
                            "place": "Banglore"
                        }, {
                            "id": 3,
                            "place": "London"
                        }, {
                            "id": 4,
                            "place": "Zurich"
                        }]; //Option sources
                    this.destinationList = [{
                            "id": 1,
                            "place": "Mumbai",
                            "sourceId": 1
                        }, {
                            "id": 2,
                            "place": "Delhi",
                            "sourceId": 1
                        }, {
                            "id": 3,
                            "place": "Kochi",
                            "sourceId": 2
                        }, {
                            "id": 4,
                            "place": "Chennai",
                            "sourceId": 2
                        }, {
                            "id": 5,
                            "place": "Genneva",
                            "sourceId": 3
                        }, {
                            "id": 6,
                            "place": "Frankfut",
                            "sourceId": 4
                        }]; // Option destination
                    this.quoteData = {};
                    this.responseFlag = false;
                    this.sourceOptions = this.sourceList;
                    this.destinationOptions = [];
                    this.currentDate = new Date(); //Get the currentdate
                    this.lastDate = new Date(); // For last date
                    this.numberOfDaysToAdd = 4; //no of dates
                    this.lastDate.setDate(this.lastDate.getDate() + this.numberOfDaysToAdd); // add the dates to the lastDate
                    this.dates = {
                        minDate: this.currentDate,
                        maxDate: this.lastDate //maximum allowed date
                    };
                }
                // Change the destination option based on the source option selection
                QuoteCreateController.prototype.getDestination = function (source) {
                    this.destinationOptions = (this.$filter('filter')(this.destinationList, {
                        sourceId: source.id
                    }));
                };
                ;
                // For the quote generation
                QuoteCreateController.prototype.quoteCreate = function () {
                    var _this = this;
                    _this.total = '';
                    _this.responseFlag = false;
                    var travelInfo = {
                        'source': _this.quoteData.source.place,
                        'destination': _this.quoteData.destination.place,
                        'persons': _this.quoteData.persons,
                        'date': _this.$filter('date')(_this.quoteData.date, 'yyyy-MM-dd'),
                        'time': _this.$filter('date')(_this.quoteData.time, 'HH:mm:ss')
                    };
                    // send the data to the server
                    _this.$http.post('/api/quote', travelInfo)
                        .success(function (data, status, headers, config) {
                        _this.total = data.total;
                        _this.responseFlag = data.success;
                    })
                        .error(function (data, status, headers, config) {
                        console.log(config);
                    });
                };
                // To apply insurance and store it in Database
                QuoteCreateController.prototype.insuranceCreate = function () {
                    var _this = this;
                    var travelInfo = {
                        'source': _this.quoteData.source.place,
                        'destination': _this.quoteData.destination.place,
                        'persons': _this.quoteData.persons,
                        'date': _this.$filter('date')(_this.quoteData.date, 'yyyy-MM-dd'),
                        'time': _this.$filter('date')(_this.quoteData.time, 'HH:mm:ss'),
                        'name': _this.$rootScope.userDetails.username,
                        'insured': 'true'
                    };
                    // send the data to the server
                    _this.$http.post('/api/insured', travelInfo);
                };
                ;
                QuoteCreateController.$inject = ['$http', '$filter', '$rootScope', 'Auth'];
                return QuoteCreateController;
            }());
            exports_1("default",angular.module('quoteCtrl', [])
                .controller('QuoteCreateController', QuoteCreateController));
        }
    }
});
//# sourceMappingURL=quoteCtrl.js.map