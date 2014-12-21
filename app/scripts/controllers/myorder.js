'use strict';

/**
 * @ngdoc function
 * @name cloudLaundryApp.controller:MyorderCtrl
 * @description
 * # MyorderCtrl
 * Controller of the cloudLaundryApp
 */
angular.module('cloudLaundryApp')
  .controller('MyorderCtrl', ['orderFactory','$scope','$location',function (orderFactory,$scope,$location) {
      $scope.goBack = function(){
      	$location.path('/');
      }

      $scope.myOrders = orderFactory.get();
      console.log("my order is :" + $scope.myOrders);
    }]);
