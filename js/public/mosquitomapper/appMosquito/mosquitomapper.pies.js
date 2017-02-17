(function() {
"use strict";
/**
 * MosquitoMapper service Pie.
 */
angular.module('appMosquito')
.service('MosquitoMapperPieService', MosquitoMapperPieService);

MosquitoMapperPieService.$inject = [];
function MosquitoMapperPieService() {
  var service = this;

  //Colors Attributs
  var colorIdentificationList = ["#99FF77","#1A75FF","#FF5050"];
  var colorTemperature = ["#1a1aff","#8080FF","#FF9999","#FF0000"];
  var colorNumber = ["#FF8566","#FF3300","#FF3333","#B30000"];
  var colorSize = ["#FF33FF","#FF1AFF","#990099"];

  //Canvas and Context Attributs
  var canvasAntennae, canvasMouthpiece, canvasWings, canvasTemperature, canvasNumberMosquitoes, canvasSize;
  var contextAntennae, contextMouthpiece, contextWings, contextTemperature, contextNumberMosquitoes, contextSize;

  //Get Labels
  var antennaeLabels = [];
  var mouthpieceLabels = [];
  var wingsLabels = [];

  var temperatureLabels = ["< 0C","< 10C","< 20C","> 20C"];
  var numberMosquitoesLabels = ["1","2 to 5","5 to 30","more"];
  var sizeLabels = [" less than 1 cm","1 to 2 cm","more than 2cm"];

  //Canvas and context initialisation
  service.init = function() {
    canvasAntennae   = document.getElementById("mosquitomapper-antennae-canvas");
    canvasMouthpiece = document.getElementById("mosquitomapper-mouthpiece-canvas");
    canvasWings      = document.getElementById("mosquitomapper-wings-canvas");
    canvasTemperature = document.getElementById("temperature-mosquitoes-canvas");
    canvasNumberMosquitoes = document.getElementById("number-mosquitoes-canvas");
    canvasSize = document.getElementById("size-mosquitoes-canvas");
    contextAntennae   = canvasAntennae.getContext("2d");
    contextMouthpiece = canvasMouthpiece.getContext("2d");
    contextWings      = canvasWings.getContext("2d");
    contextTemperature = canvasTemperature.getContext("2d");
    contextNumberMosquitoes = canvasNumberMosquitoes.getContext("2d");
    contextSize = canvasSize.getContext("2d");

    antennaeLabels.push(document.getElementById("antennae-label-type-a").innerHTML);
    antennaeLabels.push(document.getElementById("antennae-label-type-b").innerHTML);
    antennaeLabels.push(document.getElementById("antennae-label-type-c").innerHTML);
    mouthpieceLabels.push(document.getElementById("mouthpiece-label-type-a").innerHTML);
    mouthpieceLabels.push(document.getElementById("mouthpiece-label-type-b").innerHTML);
    mouthpieceLabels.push(document.getElementById("mouthpiece-label-type-c").innerHTML);
    wingsLabels.push(document.getElementById("wings-label-type-a").innerHTML);
    wingsLabels.push(document.getElementById("wings-label-type-b").innerHTML);
    wingsLabels.push(document.getElementById("wings-label-type-c").innerHTML);
  };

  //This service create the pie an canvas
  function pie(ctx, w, h, datalist, datalabel, colorlist) {

    var radius = h / 2 - 5;
    var centerx = w / 2;
    var centery = h / 2;
    var lastend = 0;
    var offset = Math.PI / 2;
    var labelxy = new Array();

    //font for the label
    var fontSize = Math.floor(h/ 20);
    ctx.textAlign = 'center';
    ctx.font = fontSize + "px Arial";
    var total = 0;
    for(var x = 0; x < datalist.length; x++) { total += datalist[x]; }

    //creation of the part of each pie
    for (var i = 0; i < datalist.length; i++) {
      var thispart = datalist[i];
      ctx.beginPath();
      ctx.fillStyle = colorlist[i];
      ctx.moveTo(centerx,centery);
      var arcsector = Math.PI * (2 * thispart / total);
      ctx.arc(centerx,centery,radius, lastend - offset, lastend + arcsector - offset, false);
      ctx.lineTo(centerx,centery);
      ctx.fill();
      ctx.closePath();

      if (thispart > (total / 20)) {
        labelxy.push(lastend + arcsector / 2 + Math.PI + offset);
      }

      lastend += arcsector;
    }

    var lradius = radius * 3 / 4;
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";
    for (var i = 0; i < labelxy.length; i++) {
      var langle = labelxy[i];
      var dx = centerx + lradius * Math.cos(langle);
      var dy = centery + lradius * Math.sin(langle);
      ctx.fillText(datalabel[i], dx, dy);
    }
  }

  //Service of creating pie
  service.createAntennaePie = function(dataList) {
    pie(contextAntennae, canvasAntennae.width, canvasAntennae.height, dataList, antennaeLabels, colorIdentificationList);
  }
  service.createMouthpiecePie = function(dataList) {
    pie(contextMouthpiece, canvasMouthpiece.width, canvasMouthpiece.height, dataList, mouthpieceLabels, colorIdentificationList);
  }
  service.createWingsPie =function(dataList) {
    pie(contextWings, canvasWings.width, canvasWings.height, dataList, wingsLabels, colorIdentificationList);
  }
  service.createTemperaturePie = function(dataList){
    pie(contextTemperature, canvasTemperature.width, canvasTemperature.height, dataList, temperatureLabels, colorTemperature);
  }
  service.createNumberPie = function(dataList){
    pie(contextNumberMosquitoes, canvasNumberMosquitoes.width, canvasNumberMosquitoes.height, dataList, numberMosquitoesLabels, colorNumber);
  }
  service.createSizePie = function(dataList){
    pie(contextSize, canvasSize.width, canvasSize.height, dataList, sizeLabels, colorSize);
  }

}



})();
