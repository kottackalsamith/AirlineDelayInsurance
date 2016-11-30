'use strict';

var models = require('../../models/weather');

exports.quoteGeneration = function(datetime, source, destination, persons, res) {
    var quoteCreation = function() {

        //Find weather condition from 'Weather' collection with respect to  Date & Time
        console.log('date and time for retrieving condition ' + datetime);
        models.Weather.findOne({
            "list.dt_txt": datetime
        }, function(err, data) {
            if (err)
                return console.error(err);
            console.log('data ' + data);
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
                return res.json({
                    success: true,
                    message: 'Total Quote',
                    total: quote
                });

            });

        });
    }

    setTimeout(quoteCreation, 2000);
}