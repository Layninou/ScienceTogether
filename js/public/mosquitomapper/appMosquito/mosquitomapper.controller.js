(function() {
"use strict";
/**
 * MosquitoMapper application.
 */
angular.module('appMosquito')
.controller('MosquitoMapperFireCtrl', MosquitoMapperFireCtrl);

MosquitoMapperFireCtrl.$inject = ['$timeout', 'MosquitoMapperFireService', 'MosquitoMapperPieService'];
function MosquitoMapperFireCtrl($timeout, MosquitoMapperFireService, MosquitoMapperPieService) {
    var $ctrl = this;

    //Quizz
    $ctrl.quizzNumber = 0;

    //Identification
    $ctrl.idNumber = 0;
    $ctrl.antennaeNOTA = 0;
    $ctrl.antennaeType1 = 0;
    $ctrl.antennaeType2 = 0;
    $ctrl.mouthpieceNOTA = 0;
    $ctrl.mouthpieceType1 = 0;
    $ctrl.mouthpieceType2 = 0;
    $ctrl.wingsNOTA = 0;
    $ctrl.wingsType1 = 0;
    $ctrl.wingsType2 = 0;

    $timeout(function () {
      //number of object in quizzs
      $ctrl.quizzNumber = MosquitoMapperFireService.getNumberQuizz();

      //number of object in identifications
      $ctrl.idNumber = MosquitoMapperFireService.getNumberIdentification();
      $ctrl.antennaeNOTA = MosquitoMapperFireService.getNumberAntennaeNOTA();
      $ctrl.antennaeType1 = MosquitoMapperFireService.getNumberAntennaeType1();
      $ctrl.antennaeType2 = MosquitoMapperFireService.getNumberAntennaeType2();
      $ctrl.mouthpieceNOTA = MosquitoMapperFireService.getNumberMouthpieceNOTA();
      $ctrl.mouthpieceType1 = MosquitoMapperFireService.getNumberMouthpieceType1();
      $ctrl.mouthpieceType2 = MosquitoMapperFireService.getNumberMouthpieceType2();
      $ctrl.wingsNOTA = MosquitoMapperFireService.getNumberWingsNOTA();
      $ctrl.wingsType1 = MosquitoMapperFireService.getNumberWingsType1();
      $ctrl.wingsType2 = MosquitoMapperFireService.getNumberWingsType2();

      //Create Pie about Identification
      var antennaeData = MosquitoMapperFireService.getArrayAntennae();
      var mouthpieceData = MosquitoMapperFireService.getArrayMouthpiece();
      var wingsData = MosquitoMapperFireService.getArrayWings();
      MosquitoMapperPieService.createAntennaePie(antennaeData);
      MosquitoMapperPieService.createMouthpiecePie(mouthpieceData);
      MosquitoMapperPieService.createWingsPie(wingsData);
    }, 5000);
}

})();
