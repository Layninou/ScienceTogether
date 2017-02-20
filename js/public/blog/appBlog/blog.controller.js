(function() {
  'use strict';

  angular.module('appBlog')
  .controller('BlogFireCtrl', BlogFireCtrl);

  BlogFireCtrl.$inject = ['$timeout', 'BlogFireService', '$location', '$anchorScroll'];
  function BlogFireCtrl($timeout, BlogFireService, $location, $anchorScroll) {

    var ctrl = this;

    ctrl.gotoId = function(elmt){
      $location.hash(elmt);
      $anchorScroll();
    };

    $timeout(function() {
        ctrl.listData = BlogFireService.getDatesArticles();
        ctrl.blogData = BlogFireService.getData();
    },2000)


  }

}());
