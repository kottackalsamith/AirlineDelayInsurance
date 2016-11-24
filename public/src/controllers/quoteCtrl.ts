// function quoteCreateController($http, $filter, $rootScope, Auth) {

//     let _this = this;

//     _this.quoteData = {};
//     _this.responseFlag = false;

//     var sourceList = [{
//         "id": 1,
//         "place": "Trivandrum"
//     }, {
//         "id": 2,
//         "place": "Banglore"
//     }, {
//         "id": 3,
//         "place": "London"
//     }, {
//         "id": 4,
//         "place": "Zurich"
//     }]; //Option sources

//     var destinationList = [{
//         "id": 1,
//         "place": "Mumbai",
//         "sourceId": 1
//     }, {
//         "id": 2,
//         "place": "Delhi",
//         "sourceId": 1
//     }, {
//         "id": 3,
//         "place": "Kochi",
//         "sourceId": 2
//     }, {
//         "id": 4,
//         "place": "Chennai",
//         "sourceId": 2
//     }, {
//         "id": 5,
//         "place": "Genneva",
//         "sourceId": 3
//     }, {
//         "id": 6,
//         "place": "Frankfut",
//         "sourceId": 4
//     }]; // Option destination

//     _this.sourceOptions = sourceList;
//     _this.destinationOptions = [];
//     _this.getDestination = function (source) {
//         _this.destinationOptions = ($filter('filter')(destinationList, {
//             sourceId: source.id
//         }));

//     };
//     // To add days
//     Date.prototype.addDays = function (days) {
//         this.setDate(this.getDate() + parseInt(days));
//         return this;
//     };
//     var currentDate = new Date(); //Get the currentdate
//     var lastDate = new Date(); // For last date
//     _this.dates = {
//         minDate: currentDate, // Minimum allowed date
//         maxDate: lastDate.addDays(4) //maximum allowed date
//     };
//     _this.quoteCreate = function () {
//         _this.total = '';
//         _this.responseFlag = false;
//         var travelInfo = {
//             'source': _this.quoteData.source.place,
//             'destination': _this.quoteData.destination.place,
//             'persons': _this.quoteData.persons,
//             'date': $filter('date')(_this.quoteData.date, 'yyyy-MM-dd'),
//             'time': $filter('date')(_this.quoteData.time, 'HH:mm:ss')
//         };

//         $http({
//             method: 'POST',
//             url: '/api/quote',
//             data: {
//                 'source': travelInfo.source,
//                 'destination': travelInfo.destination,
//                 'persons': travelInfo.persons,
//                 'date': travelInfo.date,
//                 'time': travelInfo.time
//             }


//         }).success(function (data, status, headers, config) {
//             _this.total = data.total;
//             _this.responseFlag = data.success;
//         })
//             .error(function (data, status, headers, config) {

//                 console.log(config);
//             });
//     };
//     // Apply for insurance
//     _this.insuranceCreate = function () {
//         var travelInfo = {
//             'source': _this.quoteData.source.place,
//             'destination': _this.quoteData.destination.place,
//             'persons': _this.quoteData.persons,
//             'date': $filter('date')(_this.quoteData.date, 'yyyy-MM-dd'),
//             'time': $filter('date')(_this.quoteData.time, 'HH:mm:ss'),
//             'name': $rootScope.userDetails.username,
//             'insured': 'true'
//         };
//         $http({
//             method: 'POST',
//             url: '/api/insured',
//             data: {
//                 'source': travelInfo.source,
//                 'destination': travelInfo.destination,
//                 'persons': travelInfo.persons,
//                 'date': travelInfo.date,
//                 'time': travelInfo.time,
//                 'name': travelInfo.name,
//                 'insured': travelInfo.insured
//             }
//         });
//     };
// }


class QuoteCreateController {

    public quoteData;
    public responseFlag;
    public sourceList;
    public destinationList;
    public sourceOptions;
    public destinationOptions;
    public currentDate;
    public lastDate;
    public minDate;
    public maxDate;
    public total;
    public travelInfo;


    static $inject = ['$http', '$filter', '$rootScope', 'Auth'];

    constructor(private $http: ng.IHttpService, private $filter: ng.IFilterService, private $rootScope: ng.IRootScopeService, private Auth) {

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
    }


    public getDestination(source) {
        this.destinationOptions = (this.$filter('filter')(this.destinationList, {
            sourceId: source.id
        }));

    };

    public quoteCreate() {
        let _this = this;
        _this.total = '';
        _this.responseFlag = false;

        let travelInfo = {
            'source': _this.quoteData.source.place,
            'destination': _this.quoteData.destination.place,
            'persons': _this.quoteData.persons,
            'date': _this.$filter('date')(_this.quoteData.date, 'yyyy-MM-dd'),
            'time': _this.$filter('date')(_this.quoteData.time, 'HH:mm:ss')
        }

        this.$http({
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
    }

    public insuranceCreate = function () {
        let _this = this;
        let travelInfo = {
            'source': _this.quoteData.source.place,
            'destination': _this.quoteData.destination.place,
            'persons': _this.quoteData.persons,
            'date': _this.$filter('date')(_this.quoteData.date, 'yyyy-MM-dd'),
            'time': _this.$filter('date')(_this.quoteData.time, 'HH:mm:ss'),
            'name': _this.$rootScope.userDetails.username,
            'insured': 'true'
        };
        _this.$http({
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

export default angular.module('quoteCtrl', [])
    .controller('QuoteCreateController', QuoteCreateController);