 // Whole-script strict mode syntax
 'use strict';
var request = require('request');
var models = require('../../models/weather');

//Function for Creating Weather Collection
 exports.weatherCollectionCreation = function(destination) {

     //Fetch from Weather API w.r.t User's Destination
     request('http://api.openweathermap.org/data/2.5/forecast?q=' + destination + '&mode=json&APPID=d2e8279188c8649c17540f798c9cc972', function(error, response, body) {
         var weatherinfo = JSON.parse(body);
         var weatherinfocount = weatherinfo.list.length; //Store the count of weather details fetched
         //Insert weathers details into 'Weather' Collection
         for (var i = 0; i < weatherinfocount; i++) {
             var weather = new models.Weather();
             weather.city.id = weatherinfo.city.id;
             weather.city.name = weatherinfo.city.name;
             weather.city.country = weatherinfo.city.country;
             weather.list.id = weatherinfo.list[i]["weather"][0]["id"];
             weather.list.main = weatherinfo.list[i]["weather"][0]["main"];
             weather.list.description = weatherinfo.list[i]["weather"][0]["description"];
             weather.list.dt_txt = weatherinfo.list[i]["dt_txt"];
             weather.save(body, function(err, body) {
                 if (err || !body) {
                     console.log(err);
                 }
             });
         }

     });


 }