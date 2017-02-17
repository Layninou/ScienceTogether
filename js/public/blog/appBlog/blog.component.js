(function() {
  'use strict';

  angular.module('appBlog')
  .component('articleBlog',{
    templateUrl: 'js/public/blog/snippet/blog.component.html',
    bindings: {
      title: '<',
      author: '<',
      date: '<',
      blog: '<'
    }
  });

}());
