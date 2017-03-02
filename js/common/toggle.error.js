(function() {
  'use strict';

  var usefullVar = true;

  $("#navbarToggle").blur(function(event) {
    var screenWidth = window.innerWidth;
    if (786 < screenWidth < 991) {
      if (!usefullVar) {
        $("#nav-list").collapse("show");
        $("#nav-list").css("display","block");
        usefullVar = true;
      }
      else {
        $("#nav-list").collapse("hide");
        $("#nav-list").css("display","none");
        usefullVar = false;
      }


    }

  })

}());
