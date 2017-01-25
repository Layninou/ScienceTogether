(function() {
"use strict";
/**
 * MosquitoMapper application.
 */
angular.module('appMosquito')
.controller('MosquitoMapperFireCtrl', MosquitoMapperFireCtrl);

MosquitoMapperFireCtrl.$inject = ['$firebaseObject'];
function MosquitoMapperFireCtrl($firebaseObject) {
    var $ctrl = this;

    const rootRef = firebase.database().ref();
    const ref = rootRef.child('Pictures');
    $ctrl.object = $firebaseObject(ref);
}

})();
