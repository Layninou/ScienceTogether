(function() {
"use strict";
/**
 * MosquitoMapper application.
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
    console.log("Wings : ", noneOfTheAboveWings, wingsType1, wingsType1);
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

}

})();
