let resposiveMaxWidth, responsiveMaxHeight;
let domCanvas;

const responsiveCanvasMargin = 20;

function responsiveSketch(){
  setVars();
  responsiveCanvas(); 
}

function setVars(){
  domCanvas = document.getElementsByTagName('body')[0];
  resposiveMaxWidth = width;
  resposiveMaxHeight = height;
}

function windowResized() {
  responsiveCanvas();
}

function responsiveCanvas(){
  let scaleFactor = 1;
  let availableWidth = window.innerWidth - responsiveCanvasMargin;
  let availableHeight = window.innerHeight - responsiveCanvasMargin;
  
  let scaleFactorW = availableWidth / resposiveMaxWidth;
  let scaleFactorH = availableHeight / resposiveMaxHeight;
  
  let minScaleFactor = Math.min(scaleFactorW, scaleFactorH);
  if (minScaleFactor < 1){
    scaleFactor = minScaleFactor;
  }
  
  domCanvas.style = "transform: scale(" + scaleFactor + ")";
}