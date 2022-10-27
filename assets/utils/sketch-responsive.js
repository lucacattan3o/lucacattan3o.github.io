let responsiveMaxWidth, responsiveMaxHeight;
let domCanvas;
let responsiveScaleFactor;

const responsiveCanvasMargin = 80;

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
  // can also be used in sketch
  responsiveScaleFactor = 1;

  let availableWidth = window.innerWidth - responsiveCanvasMargin;
  let availableHeight = window.innerHeight - responsiveCanvasMargin;
  
  let scaleFactorW = availableWidth / responsiveMaxWidth;
  let scaleFactorH = availableHeight / responsiveMaxHeight;
  
  let minScaleFactor = Math.min(scaleFactorW, scaleFactorH);
  if (minScaleFactor < 1){
    responsiveScaleFactor = minScaleFactor;
  }
  
  domCanvas.style = "transform: scale(" + responsiveScaleFactor + ")";
}

function responsiveMousePos(){
  return {
    x: mouseX * (1 / responsiveScaleFactor),
    y: mouseY * (1 / responsiveScaleFactor)
  };
}