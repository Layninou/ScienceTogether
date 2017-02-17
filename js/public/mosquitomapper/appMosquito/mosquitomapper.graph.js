(function() {
"use strict";
/**
 * MosquitoMapper service Graph.
 */
angular.module('appMosquito')
.service('MosquitoMapperGraphService', MosquitoMapperGraphService);

MosquitoMapperGraphService.$inject = [];
function MosquitoMapperGraphService() {
  var service = this;

  //Color Attributs
  var colorDayTime = ["purple","red","green","yellow"];
  var colorDuo = ["red","blue"];

  //Label List Attributs
  var labelDayTime =
  ["00h","01h","02h","03h","04h","05h","06h",
    "07h","08h","09h","10h","11h","12h",
    "13h","14h","15h","16h","17h","18h",
    "19h","20h","21h","22h","23h"];
  var labelPlace = ["Inside", "Outside"];
  var labelWater = ["Yes", "No"];

  //Canvas and Context
  var canvasDaytime, canvasPlace, canvasWater;
  var contextDaytime, contextPlace, contextWater;

  service.init = function() {
    canvasDaytime = document.getElementById("daytime-mosquitoes-canvas");
    canvasPlace = document.getElementById("place-mosquitoes-canvas");
    canvasWater = document.getElementById("water-mosquitoes-canvas");
    contextDaytime = canvasDaytime.getContext("2d");
    contextPlace = canvasPlace.getContext("2d");
    contextWater = canvasWater.getContext("2d");
  };

  var graph = function(ctx, w, h, datalist, colorlist, labellist) {

    var numBars = datalist.length;
    var margin = 5;
    var barWidth;
    var barHeight;
    var border = 2;
    var ratio;
    var maxBarHeight;
    var gradient;
    var largestValue;
    var graphAreaX = 0;
    var graphAreaY = 0;
    var graphAreaWidth = w;
    var graphAreaHeight = h;

    //Calculate dimension of the bar
    barWidth = graphAreaWidth / numBars - margin * 2;
    maxBarHeight = graphAreaHeight - 45;

    //Determine largest value in the bar array
    largestValue = 0;
    for (var i = 0; i < datalist.length; i++) {
      if (datalist[i] > largestValue) {
        largestValue = datalist[i];
      }
    }

    for (var i = 0; i < datalist.length; i++) {
      //set ratio
      ratio = datalist[i] / largestValue;
      barHeight = ratio * maxBarHeight;

      //Turn on shadow
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 2;
      ctx.shadowColor = "#999";

      //Draw bar background
      ctx.fillStyle = "#333";
      ctx.fillRect(margin + i * w / numBars, graphAreaHeight - barHeight - 25, barWidth, barHeight);

      //Turn off shadow
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 0;

      //create gradient
      gradient = ctx.createLinearGradient(0, 0, 0, graphAreaHeight);
      gradient.addColorStop(1-ratio, colorlist[i % colorlist.length]);
      gradient.addColorStop(1, "#FFFFFF");

      //Fill Rectangle
      ctx.fillStyle = gradient;
      ctx.fillRect(margin + i * w / numBars + border,
        graphAreaHeight - barHeight + border - 25,
        barWidth - border * 2, barHeight - border * 2);

      //Write bar value
      ctx.fillStyle = "#333";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      //IE8 Error
      try{
        ctx.fillText(parseInt(datalist[i],10),
          i * w / numBars + (w / numBars) / 2,
          graphAreaHeight - barHeight - 30);
      } catch (ex) {}

      //Draw bar label if exist
      if (labellist[i]) {
        ctx.fillStyle = "#333";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        //IE8 Error
        try{
          ctx.fillText(labellist[i],
            i * w / numBars + (w / numBars) / 2,
            h - 10 );
        } catch (ex) {}
      }
    }
  };


  //Service of creating graph
  service.createGraphDayTime = function(dataList) {
    graph(contextDaytime, canvasDaytime.width, canvasDaytime.height, dataList, colorDayTime, labelDayTime);
  };
  service.createGraphPlace = function(dataList) {
    graph(contextPlace, canvasPlace.width, canvasPlace.height, dataList, colorDuo, labelPlace);
  };
  service.createGraphWater = function(dataList) {
    graph(contextWater, canvasWater.width, canvasWater.height, dataList, colorDuo, labelWater);
  };

}

})();
