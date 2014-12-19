'use strict';

/**
 * @ngdoc service
 * @name cloudLaundryApp.timeFactory
 * @description
 * # timeFactory is created for providing 
 * # the valid day and hour duration for user to set the service time 
 * Factory in the cloudLaundryApp.
 */
angular.module('cloudLaundryApp')
  .factory('timeFactory', function () {

    //Get today's date
    var firstDay = new Date();
    //Two weeks from today on
    var lastDay = new Date(+new Date + 12096e5);
    
    //Time duration for select
    var orignalTimeDuration = [
      "08:00 - 10:00",
      "10:00 - 12:00",
      "12:00 - 14:00",
      "14:00 - 16:00",
      "16:00 - 18:00",
      "18:00 - 20:00",
      "20:00 - 22:00"
    ];
    
    // an object for date
     var dateObj = function (y,m,d){
      this.year = y;
      this.month = m;
      this.day = d;
    }
   
    //the valid durations for both day and hour that can be selected
    var validDuration = {};
    validDuration.dayDuration = []; 
    validDuration.timeDuration = [];
    




  //get the date object
  function formatDay (day) {
    var curr_date = day.getDate();
    var curr_month = day.getMonth() + 1; //Months are zero based
    var curr_year = day.getFullYear();
    var formattedDay = new dateObj(curr_year,curr_month,curr_date);   
    return formattedDay;
  }


  
   //hide specific time duration according to current real time
   function getValidTimeDuration() {
        var hour = new Date().getHours();

        switch(hour){

          //test only --- start 
          case 0:
          validDuration.timeDuration = orignalTimeDuration.slice(3);
          break;
          //test only --- end

          case 9:
          case 10:
          validDuration.timeDuration = orignalTimeDuration.slice(1);
          break;
          case 11: 
          case 12:
          validDuration.timeDuration = orignalTimeDuration.slice(2);
          break;
          case 13: 
          case 14:
          validDuration.timeDuration = orignalTimeDuration.slice(3);
          break;
          case 15: 
          case 16:
          validDuration.timeDuration = orignalTimeDuration.slice(4);
          break;
          case 17: 
          case 18:
          validDuration.timeDuration = orignalTimeDuration.slice(5);
          break;
          case 19: 
          case 20:
          validDuration.timeDuration = orignalTimeDuration.slice(6);
          break;
          default:
          validDuration.timeDuration = orignalTimeDuration.slice(0);
          break;
        }
   }

   
    function updateDurationAfterSpecificPM (today,SpecificPM) {
      if (today.getHours() >= SpecificPM) {
          today.setDate(today.getDate() + 1);
          validDuration.timeDuration = orignalTimeDuration.slice(0);
      };
    }

    function initDayDuration (startDate,endDate) {
      updateDurationAfterSpecificPM(firstDay,21); // jump to the next day when current time >= 21:00 and reset the hour duration
      while (startDate <= endDate) {
          var day = new Date(startDate);
          var oneDay = formatDay(day);
          validDuration.dayDuration.push(oneDay);
          startDate.setDate(startDate.getDate() + 1);
      }
    }


    
    initDayDuration(firstDay,lastDay);  
  



    // Public API here
    return {
      //make user get the day and time duration
      getDuration: function () {
        validDuration.timeDuration = orignalTimeDuration.slice(0);
        return validDuration;
      },
      //when user select today, then it needs to call this function to get the valid duration
      getValidTimeDuration:function(){
        getValidTimeDuration();
        return validDuration.timeDuration;
      }
    };
  });
