'use strict';

/**
 * @ngdoc service
 * @name cloudLaundryApp.MessageFactory
 * @description
 * # MessageFactory
 * Factory in the cloudLaundryApp.
 */
angular.module('cloudLaundryApp')
  .factory('MessageFactory', ['$http',function ($http) {
         var addData = function(params) {
              var method = 'POST';
              var url = "http://192.168.1.123:3000/ReceiveJSON";
              console.log($.param(params));
              return $http({
                  method: method,
                  url : url,
                  data: $.param(params),
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  success:function(res){
                    console.log(res);
                  }
              });
          }   

          var userOrder;
          var getOrder = function(id){
          

            $http.get('http://localhost:3000/GetUserOrder?id='+id).
              success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                
                 userOrder = data;
                 console.log("http get result is: ");

              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              }).then(function(){
                console.log(userOrder);
                   return userOrder;
              });
              // console.log(userOrder);
              // return userOrder;
          }      
 

          return {
              create: addData,
              get: getOrder,            
              userOrder: function(){
                console.log(userOrder);
                return userOrder;
              }
          };
      
  }]);
