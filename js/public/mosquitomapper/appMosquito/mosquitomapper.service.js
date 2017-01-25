(function() {
"use strict";
/**
 * MosquitoMapper application.
 */
angular.module('appMosquito')
.service('MosquitoMapperFireService', MosquitoMapperFireService);

MosquitoMapperFireService.$inject = ['$firebaseObject'];
function MosquitoMapperFireService($firebaseObject) {
  var service = this;

  const rootRef = firebase.database().ref();
  const identificationsRef = rootRef.child('Identifications');
  const picturesRef = rootRef.child('Pictures');
  const quizzsRef = rootRef.child('Quizzs');

  service.getNumberIdentification = function () {
    
  };
}

})();
