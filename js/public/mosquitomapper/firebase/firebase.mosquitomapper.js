(function() {

  var config = {
    apiKey: "AIzaSyBsf-f7ToSC7yQJ6Bpl_GjBtkAGGrEYHnw",
    authDomain: "mosquitofinder.firebaseapp.com",
    databaseURL: "https://mosquitofinder.firebaseio.com",
    storageBucket: "mosquitofinder.appspot.com",
    messagingSenderId: "461623120558"
  };
  firebase.initializeApp(config);

  //This is for test only
  //create firebase reference
  const rootRefTest = firebase.database().ref().child('Pictures');
  //Sync object changes
  rootRefTest.on('value', snap => console.log(snap.val()));

})();
