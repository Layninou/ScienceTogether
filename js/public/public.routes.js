(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      absract: true,
      templateUrl: 'js/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'js/public/home/snippet/home.html',
      controller: 'HomeController',
      controllerAs: 'homeCtrl'
    })
  //MosquitoMapper view
    .state('public.mosquitomapper',{
      url: '/mosquitomapper',
      templateUrl: 'js/public/mosquitomapper/snippet/mosquito.html'
    })
  //Blog view
    .state('public.blog',{
      url: '/blog',
      templateUrl: 'js/public/blog/snippet/blog.html'
    });

}

})();
