(function() {
"use strict";

angular.module('public')
.controller('MosquitoMapperController', MosquitoMapperController);

MosquitoMapperController.$inject = ['$location', '$anchorScroll'];
function MosquitoMapperController($location, $anchorScroll) {
  var ctrl = this;

  ctrl.gotoId = function(elmt){
    $location.hash(elmt);
    $anchorScroll();
  };

}

})();
