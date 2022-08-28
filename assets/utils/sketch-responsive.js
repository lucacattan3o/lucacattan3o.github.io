let responsiveMaxWidth, responsiveMaxHeight;
let domCanvas;

const responsiveCanvasMargin = 60;

function responsiveSketch(){
  setVars();
  responsiveCanvas(); 
}

function setVars(){
  domCanvas = document.getElementsByTagName('main')[0];
  responsiveMaxWidth = width;
  responsiveMaxHeight = height;
}

function windowResized() {
  responsiveCanvas();
}

function responsiveCanvas(){
  let scaleFactor = 1;
  let availableWidth = window.innerWidth - responsiveCanvasMargin;
  let availableHeight = window.innerHeight - responsiveCanvasMargin;
  
  let scaleFactorW = availableWidth / responsiveMaxWidth;
  let scaleFactorH = availableHeight / responsiveMaxHeight;
  
  let minScaleFactor = Math.min(scaleFactorW, scaleFactorH);
  if (minScaleFactor < 1){
    scaleFactor = minScaleFactor;
  }
  
  domCanvas.style = "transform: scale(" + scaleFactor + ")";
}