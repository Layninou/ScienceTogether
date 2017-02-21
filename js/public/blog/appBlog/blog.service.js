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
    var timeList = [];
    var articlesList = [];
    var blogDataList =[];
    var referenceList = [];

    //set Articles
    rootRef.on('value',blogData,blogErr);

    function blogData(data) {

      var articles = data.val();
      var keys = Object.keys(articles);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        date.push(k);

        //author
        if (articles[k].author !== undefined) {
          authorList.push(articles[k].author);
        }
        else {
          authorList.push(0);
        }

        //title
        if (articles[k].title !== undefined) {
          titleList.push(articles[k].title);
        }
        else {
          titleList.push(0);
        }

        //time
        if (articles[k].time !== undefined) {
          timeList.push(articles[k].time);
        }
        else {
          timeList.push(0);
        }

        //Article with paragraph
        if (articles[k].paragraph !== undefined) {
          var paragraphsKeys = Object.keys(articles[k].paragraph);
          var paragraphs = articles[k].paragraph;
          var oneArticle = [];

          for (var j = 0; j < paragraphsKeys.length; j++) {
            var eachElement = paragraphsKeys[j];
            oneArticle.push(paragraphs[eachElement]);
          }

          articlesList.push(oneArticle);
        }
        else {
          articlesList.push({});
        }


        //All reference
        if ( articles[k].reference !== undefined) {
          var referencesKeys = Object.keys(articles[k].reference);
          var references = articles[k].reference;
          var oneReference = [];

          for (var k = 0; k < referencesKeys.length; k++) {
            var eachElement = referencesKeys[k];
            oneReference.push(references[eachElement]);
          }

          referenceList.push(oneReference);
        }
        else {
          referenceList.push({});
        }
      }

      for (var i = 0; i < date.length; i++) {
        blogDataList.push({
          date: date[i],
          title: titleList[i],
          time: timeList[i],
          author: authorList[i],
          paragraphs: articlesList[i],
          references: referenceList[i]
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
