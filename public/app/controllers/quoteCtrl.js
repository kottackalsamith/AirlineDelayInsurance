System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function quoteCreateController($scope, $http, $filter, $rootScope, Auth) {
        var _this = this;
        _this.quoteData = {};
        _this.responseFlag = false;
        var sourceList = [{
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
        var destinationList = [{
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
        _this.sourceOptions = sourceList;
        _this.destinationOptions = [];
        var num = 2;
        _this.getDestination = function (source) {
            _this.destinationOptions = ($filter('filter')(destinationList, {
                sourceId: source.id
            }));
        };
        // To add days
        Date.prototype.addDays = function (days) {
            this.setDate(this.getDate() + parseInt(days));
            return this;
        };
        var currentDate = new Date(); //Get the currentdate
        var lastDate = new Date(); // For last date
        _this.dates = {
            minDate: currentDate,
            maxDate: lastDate.addDays(4) //maximum allowed date
        };
        _this.quoteCreate = function () {
            _this.total = '';
            _this.responseFlag = false;
            var travelInfo = {
                'source': _this.quoteData.source.place,
                'destination': _this.quoteData.destination.place,
                'persons': _this.quoteData.persons,
                'date': $filter('date')(_this.quoteData.date, 'yyyy-MM-dd'),
                'time': $filter('date')(_this.quoteData.time, 'HH:mm:ss')
            };
            $http({
                method: 'POST',
                url: '/api/quote',
                data: {
                    'source': travelInfo.source,
                    'destination': travelInfo.destination,
                    'persons': travelInfo.persons,
                    'date': travelInfo.date,
                    'time': travelInfo.time
                }
            }).success(function (data, status, headers, config) {
                _this.total = data.total;
                _this.responseFlag = data.success;
            })
                .error(function (data, status, headers, config) {
                console.log(config);
            });
        };
        // Apply for insurance
        _this.insuranceCreate = function () {
            var travelInfo = {
                'source': _this.quoteData.source.place,
                'destination': _this.quoteData.destination.place,
                'persons': _this.quoteData.persons,
                'date': $filter('date')(_this.quoteData.date, 'yyyy-MM-dd'),
                'time': $filter('date')(_this.quoteData.time, 'HH:mm:ss'),
                'name': $rootScope.userDetails.username,
                'insured': 'true'
            };
            $http({
                method: 'POST',
                url: '/api/insured',
                data: {
                    'source': travelInfo.source,
                    'destination': travelInfo.destination,
                    'persons': travelInfo.persons,
                    'date': travelInfo.date,
                    'time': travelInfo.time,
                    'name': travelInfo.name,
                    'insured': travelInfo.insured
                }
            });
        };
    }
    return {
        setters:[],
        execute: function() {
            exports_1("default",angular.module('quoteCtrl', [])
                .controller('QuoteCreateController', quoteCreateController));
        }
    }
});
//# sourceMappingURL=quoteCtrl.js.map