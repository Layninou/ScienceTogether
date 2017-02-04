(function() {
  'use strict';

  angular.module('appBlog')
  .component('article',{
    templateUrl: 'js/blog/snippet/blog.component.html',
    bindings: {
      title: '<',
      author: '<',
      date: '<',
      blog: '<'
    }
  });

}());
