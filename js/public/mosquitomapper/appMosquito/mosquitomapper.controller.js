(function() {
"use strict";
/**
 * MosquitoMapper application.
 */
angular.module('appMosquito')
.controller('MosquitoMapperFireCtrl', MosquitoMapperFireCtrl);

MosquitoMapperFireCtrl.$inject = ['$timeout', 'MosquitoMapperFireService'];
function MosquitoMapperFireCtrl($timeout, MosquitoMapperFireService) {
    var $ctrl = this;
    $ctrl.idNumber = 0;

    $timeout(function () {
      //number of object in identifications
      $ctrl.idNumber = MosquitoMapperFireService.getNumberIdentification();
    }, 2000);
}

})();
