'use strict';
var models = require('../models/weather');


var weatherCollection = require('./quote_controllers/weatherCollectionsCreation');
var accountCollection = require('./quote_controllers/account-collection-creation');
var timeConversion = require('./quote_controllers/validations/timeconversion');


var userinputValidation= require('./quote_controllers/validations/userinputvalidation');
exports.quoteCreate = function(req, res) {

    //Drop Collections
    models.Weather.collection.drop();
    models.Account.collection.drop();

    //Define the variables for input
    var source = req.body.source;
    var destination = req.body.destination;
    var persons = req.body.persons;
    var date = req.body.date;
    var time1 = req.body.time;

    //Declare global variables
    var time= timeConversion.timeConversion(time1);
    var check = userinputValidation.userInputValidation(source,destination,persons,date,time,res); 
    var datetime;

     //Function for time conversion
    //Function for user input validation

    //Sets 'check' flag as 1 for succesful validation
    if (check == 1) {
        var timeperiod; //Define for storing time range
        //Finds Time range period for user input time
        if ((time >= '00:00:00') && (time < '03:00:00')) {
            timeperiod = '00:00:00';
        } else if ((time >= '03:00:00') && (time < '06:00:00')) {
            timeperiod = '03:00:00';
        } else if ((time >= '06:00:00') && (time < '09:00:00')) {
            timeperiod = '06:00:00';
        } else if ((time >= '09:00:00') && (time < '12:00:00')) {
            timeperiod = '09:00:00';
        } else if ((time >= '12:00:00') && (time < '15:00:00')) {
            timeperiod = '12:00:00';
        } else if ((time >= '15:00:00') && (time < '18:00:00')) {
            timeperiod = '15:00:00';
        } else if ((time >= '18:00:00') && (time < '21:00:00')) {
            timeperiod = '18:00:00';
        } else if ((time >= '21:00:00') && (time < '24:00:00')) {
            timeperiod = '21:00:00';
        }
        //Combine date and time
        datetime = date + ' ' + timeperiod;
        //Insert Documents into 'Weather' Collection
        weatherCollection.weatherCollectionCreation(destination);
        //Insert Documents into 'Account' Collection
        accountCollection.accountCollectionCreation('Trivandrum', 'Mumbai', 1000);
        accountCollection.accountCollectionCreation('Trivandrum', 'Delhi', 1500);
        accountCollection.accountCollectionCreation('Banglore', 'Kochi', 2500);
        accountCollection.accountCollectionCreation('Banglore', 'Chennai', 2000);
        accountCollection.accountCollectionCreation('London', 'Genneva', 5000);
        accountCollection.accountCollectionCreation('Zurich', 'Frankfurt', 6000);
        //Define function for implementing business logic
        var quoteGeneration = function() {

            //Find weather condition from 'Weather' collection with respect to  Date & Time
            console.log('date and time for retrieving condition ' + datetime);
            models.Weather.findOne({
                "list.dt_txt": datetime
            }, function(err, data) {
                if (err)
                    return console.error(err);
                var weathercondition = data.list['description']; //Assign condition in 'weathercondition'
                //Find Amount from 'Account' Collection with respect to Source & Destination
                models.Account.findOne({
                    "source": source,
                    "destination": destination
                }, function(err, data) {
                    if (err) return console.error(err);
                    var amount = data.amount; //Assign amount in 'amount'
                    var noofusers = persons; //Assign persons in 'noofusers'
                    console.log('xxxxxxVerifyxxxAmountxxxxxxx');
                    console.log('Amount: ' + amount);
                    console.log('Condition: ' + weathercondition);
                    console.log('No of Users: ' + noofusers);
                    console.log('xxxxxVerifyxxxxAmountxxxxxxx');
                    var quote = 0; // Assign for quote amount
                    //Checks Weather Conditions
                    if (weathercondition == 'moderate rain') {
                        quote = amount + (10 / 100);
                    } else if (weathercondition == 'light rain') {
                        quote = amount + (8 / 100);
                    } else if (weathercondition == 'overcast clouds') {
                        quote = amount + (6 / 100);
                    } else if (weathercondition == 'broken clouds') {
                        quote = amount + (4 / 100);
                    } else if (weathercondition == 'scattered clouds') {
                        quote = amount + (2 / 100);
                    } else {
                        quote = amount;
                    }
                    //Checks noofusers
                    if (noofusers >= 3) {
                        quote = quote - (15 / 100);
                    } else if (noofusers == 2) {
                        quote = quote - (10 / 100);
                    } else {
                        quote = quote;
                    }
                    //Sends Amount
                    console.log('Exact Amount to be paid ' + quote);
                    res.json({
                        success: true,
                        message: 'Total Quote',
                        total: quote
                    });

                });

            });


        };
        setTimeout(quoteGeneration, 2000);

    }
 
    
    
   
    


};