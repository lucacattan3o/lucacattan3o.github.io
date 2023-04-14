/**
* @file A simple plugin library to make your p5.js sketch responsive
* It works also in p5.js editor
* @author Luca Cattaneo <luca.cattaneo@mekit.it>
* @copyright Luca Cattaneo 2023
* @license MIT License
*/

// todo: define a global object to store all the variables

let responsiveMaxWidth, responsiveMaxHeight;
let responsiveDomCanvas;
let responsiveScaleFactor;
let responsiveCanvasMargin;

/**
 * Make your sketch resposive
 * @summary Use this function inside p5.js setup() function 
 * @param {Object} options - custom options
 * @param {HTMLElement} options.el - dom element to scale
 * @param {Number} options.margin - margin left aroud the sketch
 */
function responsiveSketch(options){

  let defaultSettings = {
    el: document.getElementsByTagName('main')[0],
    margin: 80,
  };

  if (!options) options = {};

  // Extend options
  var settings = {};
  for(var key in defaultSettings){
    if(options.hasOwnProperty(key)){
      settings[key] = options[key];
    } else {
      settings[key] = defaultSettings[key];
    }
  }

  responsiveCanvasMargin = settings.margin;
  responsiveDomCanvas = settings.el;

  responsiveMaxWidth = width;
  responsiveMaxHeight = height;

  responsiveCanvas(); 
}

/**
 * Get the correct position of the mouse on the the sketch
 * - define a global variable at the beginning of your sketch: let mPos;
 * - use this function inside p5.js draw() function
 * - mPos = responsiveMousePos();
 * - instead of mouseX you can now use mPos.x
 * - instead of mouseY you can now use mPos.y
 * @return {Object} an object representing the position of the mouse
 */
function responsiveMousePos(){
  return {
    x: mouseX * (1 / responsiveScaleFactor),
    y: mouseY * (1 / responsiveScaleFactor)
  };
}

/**
 * Update the scale when the window is resized
 */
function windowResized() {
  responsiveCanvas();
}

/**
 * Scale the sketch
 */
function responsiveCanvas(){
  responsiveScaleFactor = 1;

  let availableWidth = window.innerWidth - responsiveCanvasMargin;
  let availableHeight = window.innerHeight - responsiveCanvasMargin;
  
  let scaleFactorW = availableWidth / responsiveMaxWidth;
  let scaleFactorH = availableHeight / responsiveMaxHeight;
  
  let minScaleFactor = Math.min(scaleFactorW, scaleFactorH);
  if (minScaleFactor < 1){
    responsiveScaleFactor = minScaleFactor;
  }
  
  responsiveDomCanvas.style = "transform: scale(" + responsiveScaleFactor + ")";
}

