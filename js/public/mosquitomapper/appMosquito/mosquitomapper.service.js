(function() {
"use strict";
/**
 * MosquitoMapper service firebase.
 */
angular.module('appMosquito')
.service('MosquitoMapperFireService', MosquitoMapperFireService);

MosquitoMapperFireService.$inject = ['$q', '$firebaseObject', '$firebaseArray'];
function MosquitoMapperFireService($q, $firebaseObject, $firebaseArray) {
  var service = this;

  //Data attribut
  const rootRef = firebase.database().ref();
  const identificationsRef = rootRef.child('Identifications');
  const picturesRef = rootRef.child('Pictures');
  const quizzsRef = rootRef.child('Quizzs');

  //Service Attributs
    //quizz
  var arrayOfQuizz = $firebaseArray(quizzsRef);
  var lengthQuizz;

  var allLatitude  = [];
  var allLongitude = [];

  var mosquitoNumberAnswer1 = 0;
  var mosquitoNumberAnswer2 = 0;
  var mosquitoNumberAnswer3 = 0;
  var mosquitoNumberAnswer4 = 0;

  var mosquitoSizeLower  = 0;
  var mosquitoSizeNormal = 0;
  var mosquitoSizeUpper  = 0;

  var mosquitoTemperature0     = 0;
  var mosquitoTemperature10    = 0;
  var mosquitoTemperature20    = 0;
  var mosquitoTemperatureUpper = 0;

  var mosquitoWaterYes = 0;
  var mosquitoWaterNo  = 0;

  var mosquitoInside  = 0;
  var mosquitoOutside = 0;

  var mosquitoWithPicture = 0;

  var mosquitoTime =
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    //identification
  var arrayOfIdent = $firebaseArray(identificationsRef);
  var lengthIdentification;

  var noneOfTheAboveAntennae = 0;
  var antennaeType1 = 0;
  var antennaeType2 = 0;
  var noneOfTheAboveMouthpiece = 0;
  var mouthpieceType1 = 0;
  var mouthpieceType2 = 0;
  var noneOfTheAboveWings = 0;
  var wingsType1 = 0;
  var wingsType2 = 0;

  //Set length Attributs
  arrayOfIdent.$loaded()
    .then(function(data) {
      lengthIdentification = data.length;
    })
    .catch(function(error) {
      console.error("Error: ", error);
    });

  arrayOfQuizz.$loaded()
    .then(function(data){
      lengthQuizz = data.length;
    })
    .catch(function(error) {
      console.error("Error: ", error);
    });

  //Set Quizz
  quizzsRef.on('value',gotQuizzData, errQuizzData);

  function gotQuizzData(data) {
    console.log("Test Service Localisation");

    var quizzs = data.val();
    var keys = Object.keys(quizzs);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];

      //receive all data
      var latitute = quizzs[k].Quizz.Latitude;
      var longitude = quizzs[k].Quizz.Longitude;

      var bodywarm = quizzs[k].Quizz.Bodywarm;
      var daytime = quizzs[k].Quizz.Daytime;
      var size = quizzs[k].Quizz.Size;
      var temperature = quizzs[k].Quizz.Temperature;
      var numberMosquito = quizzs[k].Quizz.Mosquito;
      var placeMosquito = quizzs[k].Quizz.Inside_or_Outside;
      var mosquitoPicture = quizzs[k].Quizz.Picture;

      //Place in the world
      if (latitute !== 0 && longitude !== 0) {
        allLatitude.push(latitute);
        allLongitude.push(longitude);
      }

      //Mosquito Number
      if (numberMosquito === 1) { mosquitoNumberAnswer1++; }
      if (numberMosquito === 2) { mosquitoNumberAnswer2++; }
      if (numberMosquito === 3) { mosquitoNumberAnswer3++; }
      if (numberMosquito === 4) { mosquitoNumberAnswer4++; }

      //Mosquito Size
      if (size === 1) { mosquitoSizeLower++; }
      if (size === 2) { mosquitoSizeNormal++; }
      if (size === 3) { mosquitoSizeUpper++; }

      //Temperature around Mosquito
      if (temperature === 1) { mosquitoTemperature0++; }
      if (temperature === 2) { mosquitoTemperature10++; }
      if (temperature === 3) { mosquitoTemperature20++; }
      if (temperature === 4) { mosquitoTemperatureUpper++; }

      //Mosquito Inside or Outside
      if (placeMosquito === 1) { mosquitoInside++; }
      if (placeMosquito === 2) { mosquitoOutside++; }

      //Mosquito around water
      if (bodywarm === 1) { mosquitoWaterYes++; }
      if (bodywarm === 2) { mosquitoWaterNo++; }

      //Picture of mosquito
      if (mosquitoPicture === 1) { mosquitoWithPicture++; }

      //Daytime the data is take
      mosquitoTime[daytime]++;

    }

    console.log("All the Latitude: ");
    console.log(allLatitude);
    console.log("All the Longitude: ");
    console.log(allLongitude);
    console.log("Daytime array of mosquito take: ");
    console.log(mosquitoTime);
    console.log("Temperature around mosquito: ");
    console.log("Less than 0C: ", mosquitoTemperature0);
    console.log("Less than 10C: ", mosquitoTemperature10);
    console.log("Less than 20C: ", mosquitoTemperature20);
    console.log("More than 20C: ", mosquitoTemperatureUpper);
    console.log("Mosquito inside vs outide: ", mosquitoInside, mosquitoOutside);
    console.log("With water around (Y/N): ", mosquitoWaterYes, mosquitoWaterNo);
    console.log("Picture take: ", mosquitoWithPicture);

    console.log("End Test Service Localisation");
  }

  function errQuizzData(err) {
    console.log("Error!");
    console.log(err);
  }

  //Set Identification
  identificationsRef.on('value',gotIdenData, errIdenData);

  function gotIdenData(data) {
    console.log("Test Service Identification");
    var identif = data.val();
    var keys = Object.keys(identif)
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var antennae = identif[k].Identification.Antennae;
      var mouthpiece = identif[k].Identification.Mouthpiece;
      var wings = identif[k].Identification.Wings;

      if (antennae === -1) { noneOfTheAboveAntennae++; }
      if (mouthpiece === -1) { noneOfTheAboveMouthpiece++; }
      if (wings === -1) { noneOfTheAboveWings++; }

      if (antennae === 1) { antennaeType1++; }
      if (mouthpiece === 1) { mouthpieceType1++; }
      if (wings === 1) { wingsType1++; }

      if (antennae === 2) { antennaeType2++; }
      if (mouthpiece === 2) { mouthpieceType2++; }
      if (wings === 2) { wingsType2++; }
    }
    console.log("Antennae : ", noneOfTheAboveAntennae, antennaeType1, antennaeType2);
    console.log("Mouthpiece : ", noneOfTheAboveMouthpiece, mouthpieceType1, mouthpieceType2);
    console.log("Wings : ", noneOfTheAboveWings, wingsType1, wingsType2);
    console.log("End Test Service Identification");
  }

  function errIdenData(err) {
    console.log("Error!");
    console.log(err);
  }

  //Get Function that return all the answer to the controller
  service.getNumberIdentification = function () {
    return lengthIdentification;
  };
  service.getNumberQuizz = function () {
    return lengthQuizz;
  };
  service.getDayTime = function (){
    return mosquitoTime;
  }

    //Latitude and Longitude
  service.getArrayLatitude = function() {
    return allLatitude;
  };
  service.getArrayLongitude = function() {
    return allLongitude;
  };

    //Quizz data
  service.getArrayNumberMosquitoes = function() {
    return [mosquitoNumberAnswer1,mosquitoNumberAnswer2,mosquitoNumberAnswer3,mosquitoNumberAnswer4];
  };
  service.getArraySize = function() {
    return [mosquitoSizeLower,mosquitoSizeNormal,mosquitoSizeUpper];
  };
  service.getArrayTemperature = function() {
    return [mosquitoTemperature0, mosquitoTemperature10, mosquitoTemperature20, mosquitoTemperatureUpper];
  };
  service.getArrayPlace = function (){
    return [mosquitoInside, mosquitoOutside];
  }
  service.getArrayWater = function (){
    return [mosquitoWaterYes, mosquitoWaterNo];
  }
  service.getNumberPicture = function() {
    return mosquitoWithPicture;
  }

    //Antennae
  service.getNumberAntennaeType1 = function () {
    return antennaeType1;
  };
  service.getNumberAntennaeType2 = function () {
    return antennaeType2;
  };
  service.getNumberAntennaeNOTA = function () {
    return noneOfTheAboveAntennae;
  };
  service.getArrayAntennae = function () {
    return [antennaeType1,antennaeType2,noneOfTheAboveAntennae];
  };
    //Mouthpiece
  service.getNumberMouthpieceType1 = function () {
    return mouthpieceType1;
  };
  service.getNumberMouthpieceType2 = function () {
    return mouthpieceType2;
  };
  service.getNumberMouthpieceNOTA = function () {
    return noneOfTheAboveMouthpiece;
  };
  service.getArrayMouthpiece = function () {
    return [mouthpieceType1,mouthpieceType2,noneOfTheAboveMouthpiece];
  };
    //Wings
  service.getNumberWingsType1 = function () {
    return wingsType1;
  };
  service.getNumberWingsType2 = function () {
    return wingsType2;
  };
  service.getNumberWingsNOTA = function () {
    return noneOfTheAboveWings;
  };
  service.getArrayWings = function () {
    return [wingsType1, wingsType2, noneOfTheAboveWings];
  }

}

})();
