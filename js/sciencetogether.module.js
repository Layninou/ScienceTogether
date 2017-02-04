(function() {
"use strict";

/**
 * Main module with public module dependencies
 */
angular.module('ScienceTogether', ['public', 'appMosquito', 'appBlog'])
.config(config);

config.$inject = ['$urlRouterProvider'];
function config($urlRouterProvider) {

  // If user goes to a path that doesn't exist, redirect to public root
  $urlRouterProvider.otherwise('/');
}

})();
