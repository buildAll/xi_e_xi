'use strict';

/**
 * @ngdoc function
 * @name cloudLaundryApp.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the cloudLaundryApp
 */
angular.module('cloudLaundryApp')
  .controller('OrderCtrl', ['timeFactory','addressFactory','orderFactory','$scope','$location', function (timeFactory,addressFactory,orderFactory,$scope,$location) {
    
   var todayDate = new Date;
   var today = todayDate.getDate();


   $scope.dayList = timeFactory.getDuration().dayDuration;
   $scope.timeList = timeFactory.getValidTimeDuration();
  



   //if the first valid day is today, get the valid time durations for select
   //else, use the full time durations for select 
   function getTimeDuration (index) {
      if ($scope.dayList[index].day.day === today) {
	      $scope.timeList = timeFactory.getValidTimeDuration();
	   }else{
	   	  $scope.timeList = timeFactory.getDuration().timeDuration;
	   }
   }

   
   

      
    $scope.updateTimeDuration = function () {
    	var selectIndex = $scope.selectedDay.id-1;
    	getTimeDuration(selectIndex);
      $scope.selectedTime = $scope.timeList[0]; 
    }
   
     //init day and time select 
      $scope.selectedDay = $scope.dayList[0];
      $scope.selectedTime = $scope.timeList[0];
   

    $scope.addAddress = function () {
      $location.path('/address');
    }

    $scope.goBack = function () {
      $location.path('/');
    }
    
   $scope.userAddress = addressFactory.getUserAddress();
   $scope.selectedAddress="";
   
  $scope.createOrder = function(){
      var order = {};
      var addressIndex =$scope.selectedAddress;
      order.name = $scope.userAddress[addressIndex].userName;
      order.tel = $scope.userAddress[addressIndex].userTel;
      order.day = $scope.selectedDay;
      order.time = $scope.selectedTime;
      order.city = $scope.userAddress[addressIndex].cityName;
      order.zone = $scope.userAddress[addressIndex].zone;
      order.detailAddress = $scope.userAddress[addressIndex].detail;
      orderFactory.add(order);
      $location.path('/mine');
   }
    

    
  

   

   


  }]);
