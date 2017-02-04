(function() {
  'use strict';

  angular.module('appBlog')
  .controller('BlogFireCtrl', BlogFireCtrl);

  BlogFireCtrl.$inject = ['BlogFireService'];
  function BlogFireCtrl(BlogFireService) {
    this.object = BlogFireService.getObjectTest();
  }

}());
