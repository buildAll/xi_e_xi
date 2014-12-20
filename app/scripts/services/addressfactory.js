'use strict';

/**
 * @ngdoc service
 * @name cloudLaundryApp.addressFactory
 * @description
 * # addressFactory
 * Factory in the cloudLaundryApp.
 */
angular.module('cloudLaundryApp')
  .factory('addressFactory', function () {
   var city = [
     {id:1,name:"南京",zone:["玄武","江宁","仙林"]},
     {id:2,name:"上海",zone:["徐汇","静安"]},
     {id:3,name:"北京",zone:["朝阳","东城"]}
   ];

   var userAddress = [];

   function addNewAddress(addr){
     userAddress.push(addr);
   }

   

   function getCityZone(city){
    var cityZone = [];
    // city.zone.foreach(function(val){
    //      cityZone.push(val);
    // })
     for (var i = 0; i < city.zone.length; i++) {
       cityZone.push(city.zone[i]);
     };
     return cityZone;
   }

    

    // Public API here
    return {
      getCity: function () {
        return city;
      },
      getUserAddress: function () {
        return userAddress;
      },
      getZone: getCityZone,
      add:addNewAddress
    };
  });
