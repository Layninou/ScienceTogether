(function() {
  'use strict';

  angular.module('public')
  .controller('HomeController',HomeController);

  HomeController.$inject = ['$location', '$anchorScroll'];
  function HomeController($location, $anchorScroll) {

    var ctrl = this;

    ctrl.gotoId = function(elmt){
      $location.hash(elmt);
      $anchorScroll();
    };

  }

}());
