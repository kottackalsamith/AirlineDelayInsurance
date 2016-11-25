'use strict';
//Function for verifying persons,date,time
exports.validationPersonsDateTime = function(persons, date, time,res) {
    var check;
    //Checks No: of Persons
    if (persons >= 1) {

        var hours;
        var minutes;
        var currenttime;
        //Set Today's Date
        var now = new Date();
        var today = now.toISOString().slice(0, 10);
        //Increment today's Date
        now.setDate(now.getDate() + 4);
        var dateincrement = now.toISOString().slice(0, 10);
        //Checks date is within five days from current date
        if ((date >= today && date <= dateincrement)) {
            //Checks time
            if ((time >= '00:00:00') && (time <= '24:00:00')) {
                if (date == today) {
                    //Fetch Current time
                    hours = (now.getHours() < 10 ? '0' : '') + now.getHours();
                    minutes = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
                    currenttime = hours + ":" + minutes + ":00";
                    //Compare time is greater than current if date==today
                    if (time >= currenttime) {
                        console.log('Validation Passed');
                        check = 1; //Set flag
                    } else {
                        console.log('Validation not passed');
                        res.json({
                            success: false,
                            message: 'Time Not Passed',

                        });
                    }

                } else {
                    console.log('Validation passed');
                    check = 1; //Set flag

                }

            } else {
                console.log('Time not Valid');
                res.json({
                    success: false,
                    message: 'Time Not Valid',

                });

            }

        } else {
            console.log('Date not Valid');
            res.json({
                success: false,
                message: 'Date Not Valid',

            });

        }

    } else {
        console.log('Persons Count is not Valid');
        res.json({
            success: false,
            message: 'Persons Count is not valid',

        });

    }

    return check;

}