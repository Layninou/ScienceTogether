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

  var initLatLong = new google.maps.LatLng(0,0);
  var myOptions = {
    zoom      : 2,
    center    : initLatLong,
    mapTypeId : google.maps.MapTypeId.TERRAIN,
    maxzoom   : 20
  };

  var map = new google.maps.Map(document.getElementById("map-mosquitoes"),myOptions);

  $(window).resize(function() {
    google.maps.event.trigger(map,"resize");
  });

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
