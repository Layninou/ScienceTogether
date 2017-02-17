(function() {
"use strict";
/**
 * MosquitoMapper map service.
 */
angular.module('appMosquito')
.service('MosquitoMapperMapService', MosquitoMapperMapService);

MosquitoMapperMapService.$inject = [];
function MosquitoMapperMapService() {
  var service = this;

  var map;

  var initLatLong = new google.maps.LatLng(0,0);
  var myOptions = {
    zoom      : 2,
    center    : initLatLong,
    mapTypeId : google.maps.MapTypeId.TERRAIN,
    maxzoom   : 20
  };

  service.init = function() {
    var test = document.getElementById("map-mosquitoes");
    map = new google.maps.Map(test,myOptions);
  };

  service.createMapMosquitoes = function(dataLat, dataLng) {
    for (var i = 0; i < dataLat.length; i++) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(dataLng[i],dataLat[i]),
        map: map
      })
    }
  };

}
})();
