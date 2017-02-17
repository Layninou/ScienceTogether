(function() {
  'use strict';

  angular.module('appBlog')
  .controller('BlogFireCtrl', BlogFireCtrl);

  BlogFireCtrl.$inject = ['$timeout', 'BlogFireService'];
  function BlogFireCtrl($timeout, BlogFireService) {

    var ctrl = this;

    $timeout(function() {
        ctrl.listData = BlogFireService.getDatesArticles();
        ctrl.blogData = BlogFireService.getData();
    },2000)


  }

}());
