(function() {
"use strict";
/**
 * MosquitoMapper application.
 */
angular.module('appMosquito')
.controller('MosquitoMapperFireCtrl', MosquitoMapperFireCtrl);

MosquitoMapperFireCtrl.$inject = ['$timeout','$location', '$anchorScroll', 'MosquitoMapperFireService', 'MosquitoMapperPieService','MosquitoMapperGraphService', 'MosquitoMapperMapService'];
function MosquitoMapperFireCtrl($timeout, $location, $anchorScroll, MosquitoMapperFireService, MosquitoMapperPieService,MosquitoMapperGraphService, MosquitoMapperMapService) {
    var $ctrl = this;

    $ctrl.gotoId = function(elmt){
      $location.hash(elmt);
      $anchorScroll();
    };

    //Quizz
    $ctrl.quizzNumber = 0;
    $ctrl.nbPictures = 0;

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

    var progressBar;

    //init DOM (because this code is not beautiful)
    $timeout(function () {
      MosquitoMapperPieService.init();
      MosquitoMapperGraphService.init();
      MosquitoMapperMapService.init();

      progressBar = document.getElementById("MosquitoProgress");
      progressBar.setAttribute("style","width: 5%");
      progressBar.innerHTML = "Loading Data";
    }, 10);

    //Progress Bar
    $timeout(function () {
      progressBar.setAttribute("style","width: 25%");
    }, 1000);

    $timeout(function () {
      progressBar.setAttribute("style","width: 50%");
    }, 2000);

    $timeout(function () {
      progressBar.setAttribute("style","width: 75%");
    }, 3000);


    //after database is load
    $timeout(function () {
      progressBar.setAttribute("style","width: 100%");
      progressBar.innerHTML = "Data Loaded";

      //number of object in quizzs
      $ctrl.quizzNumber = MosquitoMapperFireService.getNumberQuizz();
      $ctrl.nbPictures = MosquitoMapperFireService.getNumberPicture();

      //Create Pie about Quizz
      var numberData = MosquitoMapperFireService.getArrayNumberMosquitoes();
      var sizeData = MosquitoMapperFireService.getArraySize();
      var temperatureData = MosquitoMapperFireService.getArrayTemperature();
      MosquitoMapperPieService.createTemperaturePie(temperatureData);
      MosquitoMapperPieService.createNumberPie([10,10,10,10]);
      MosquitoMapperPieService.createSizePie([10,10,10]);

      //Create Graph about Quizz
      var daytimeData = MosquitoMapperFireService.getDayTime();
      var placeData = MosquitoMapperFireService.getArrayPlace();
      var waterData = MosquitoMapperFireService.getArrayWater();
      MosquitoMapperGraphService.createGraphDayTime(daytimeData);
      MosquitoMapperGraphService.createGraphPlace(placeData);
      MosquitoMapperGraphService.createGraphWater(waterData);

      //Create Map
      var latData = MosquitoMapperFireService.getArrayLatitude();
      var lngData = MosquitoMapperFireService.getArrayLongitude();
      MosquitoMapperMapService.createMapMosquitoes(latData, lngData);

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
    }, 4000);
}

})();
