'use strict';

/**
 * @ngdoc function
 * @name cloudLaundryApp.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the cloudLaundryApp
 */
angular.module('cloudLaundryApp')
  .controller('OrderCtrl', ['timeFactory','addressFactory','$scope','$location', function (timeFactory,addressFactory,$scope,$location) {
    
    
   var todayDate = new Date;
   var today = todayDate.getDate();
   
     
   var dayDuration = timeFactory.getDuration().dayDuration;//get day duration

   var timeDuration;
   var dayInChinese = [];//get day in Chinese


   //if the first valid day is today, get the valid time durations for select
   //else, use the full time durations for select 
   function getTimeDuration (index) {
      if (dayDuration[index].day === today) {
	      timeDuration = timeFactory.getValidTimeDuration();
	   }else{
	   	  timeDuration = timeFactory.getDuration().timeDuration;
	   }
   }

   
   
   //get the day duration for select
   function initDayDuration () {
   	for (var i = 0; i < dayDuration.length; i++) {
   	  dayInChinese.push( dayDuration[i].year + "年" +dayDuration[i].month + "月" + dayDuration[i].day + "日" ); 
    };
    $scope.dayForSelect = dayInChinese.slice(0);
   }

  
  
  //init time duration
  function initTimeDuration () {
  	getTimeDuration(0)
    $scope.timeForSelect = timeDuration.slice(0);
  }
      
    $scope.updateTimeDuration = function () {
    	var selectIndex = Number($scope.selectedDay);
    	getTimeDuration(selectIndex);
    	$scope.timeForSelect = timeDuration.slice(0);
        $scope.selectedTime = ""; 
    }

     //init day and time select 
     $scope.selectedDay = "0";
     $scope.selectedTime = "0"; 
     initDayDuration();
     initTimeDuration();

    $scope.addAddress = function () {
      $location.path('/address');
    }

    $scope.goBack = function () {
      $location.path('/');
    }
    
   $scope.userAddress = addressFactory.getUserAddress();

    
   $scope.selectedOrder = 0;

   


  }]);
