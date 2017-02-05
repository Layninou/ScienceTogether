(function() {
  'use strict';

  // Initialize Firebase
  var configBlog = {
    apiKey: "AIzaSyClWaoRpVBKFUkajoxw3X7BDdGbfFKfXzI",
    authDomain: "blogsciencetogether-f6250.firebaseapp.com",
    databaseURL: "https://blogsciencetogether-f6250.firebaseio.com",
    storageBucket: "blogsciencetogether-f6250.appspot.com",
    messagingSenderId: "369552791032"
  };
  var fireBlog = firebase.initializeApp(configBlog, "Blog");

  angular.module('appBlog')
  .service('BlogFireService', BlogFireService);

  BlogFireService.$inject = ['$firebaseObject'];
  function BlogFireService($firebaseObject) {
    var service = this;

    //Data attribut
    const rootRef = fireBlog.database().ref();

    service.getObjectTest = function() {
      return $firebaseObject(rootRef);;
    }

  }

}());
