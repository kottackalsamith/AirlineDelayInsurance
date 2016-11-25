   'use strict';
   //Function for TimeConversion
   exports.timeConversion = function(time2) {

       var time1 = time2 + ' ';
       var time;
       //Define hours
       var hours = Number(time1.match(/^(\d+)/)[1]);
       //Define minutes
       var minutes = Number(time1.match(/:(\d+)/)[1]);
       var sHours;
       var sMinutes;
       //Case for hours>12
       if (hours > 12) {

           sHours = hours.toString();
           sMinutes = minutes.toString();
           if (minutes < 10) sMinutes = "0" + sMinutes;
           time = sHours + ":" + sMinutes + ":00";
           console.log('Time For Processing: ' + time);

       } else {
           //Define Variable for storing AM & PM
           var AMPM = time1.match(/\s(.*)$/)[1];
           if (AMPM == 'AM') {
               if (hours == 12)
                   hours = hours - 12;
               sHours = hours.toString();
               sMinutes = minutes.toString();
               if (hours < 10) sHours = "0" + sHours;
               if (minutes < 10) sMinutes = "0" + sMinutes;
               //set the variable time
               time = sHours + ":" + sMinutes + ":00";
               console.log('Time For Processing: ' + time);

           } else if (AMPM == 'PM') {
               if (hours < 12)
                   hours = hours + 12;
               sHours = hours.toString();
               sMinutes = minutes.toString();
               if (minutes < 10) sMinutes = "0" + sMinutes;
               //set the variable time
               time = sHours + ":" + sMinutes + ":00";
               console.log('Time For Processing: ' + time);

           } else {
               sHours = hours.toString();
               sMinutes = minutes.toString();
               if (hours < 10) sHours = "0" + sHours;
               if (minutes < 10) sMinutes = "0" + sMinutes;
               //set the variable time
               time = sHours + ":" + sMinutes + ":00";
               console.log('Time For Processing: ' + time);

           }

       }

       return time;

   }