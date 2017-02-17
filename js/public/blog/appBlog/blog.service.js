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

    //data we need
    var date = [];
    var authorList = [];
    var titleList = [];
    var articlesList = [];
    var blogDataList =[];

    //set Articles
    rootRef.on('value',blogData,blogErr);

    function blogData(data) {

      var articles = data.val();
      var keys = Object.keys(articles);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        date.push(k);

        authorList.push(articles[k].author);
        titleList.push(articles[k].title);

        var paragraphsKeys = Object.keys(articles[k].paragraph);
        var paragraphs = articles[k].paragraph;
        var oneArticle = [];

        for (var j = 0; j < paragraphsKeys.length; j++) {
          var eachElement = paragraphsKeys[j];
          oneArticle.push(paragraphs[eachElement]);
        }

        articlesList.push(oneArticle);
      }

      for (var i = 0; i < date.length; i++) {
        blogDataList.push({
          date: date[i],
          title: titleList[i],
          author: authorList[i],
          paragraphs: articlesList[i]
        });
      }



    }

    function blogErr(err) {
      console.log("Error!");
      console.log(err);
    }




    //service tools
    service.getTitles = function() {
      return titleList;
    }
    service.getAuthors = function() {
      return authorList;
    }
    service.getDatesArticles = function() {
      return date;
    }
    service.getAllArticles = function() {
      return articlesList;
    }
    service.getData = function() {
      return blogDataList;
    }

  }

}());
