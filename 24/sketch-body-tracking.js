// webcam variables
let capture; // our webcam
let captureEvent; // callback when webcam is ready
let camReady = false;
let camSize = 0.2;

// function: launch webcam
function captureWebcam() {
  capture = createCapture(
    {
      audio: false,
      video: {
        facingMode: "user",
      },
    },
    function (e) {
      captureEvent = e;
      console.log(captureEvent.getTracks()[0].getSettings());
      // do things when video ready
      // until then, the video element will have no dimensions, or default 640x480
      capture.srcObject = e;

      setCameraDimensions(capture);
      mediaPipe.predictWebcam(capture);
      //mediaPipe.predictWebcam(parentDiv);

      camReady = true;
    }
  );
  capture.elt.setAttribute("playsinline", "");
  capture.hide();
}

// function: resize webcam depending on orientation
function setCameraDimensions(video) {

  const vidAspectRatio = video.width / video.height; // aspect ratio of the video
  const canvasAspectRatio = width / height; // aspect ratio of the canvas

  if (vidAspectRatio > canvasAspectRatio) {
    // Image is wider than canvas aspect ratio
    video.scaledHeight = height;
    video.scaledWidth = video.scaledHeight * vidAspectRatio;
  } else {
    // Image is taller than canvas aspect ratio
    video.scaledWidth = width;
    video.scaledHeight = video.scaledWidth / vidAspectRatio;
  }
}

function camPosition() {
  let camWidth = capture.scaledWidth * camSize;
  let camHeight = capture.scaledHeight * camSize;
  let offset = 5;
  let cx = offset;
  let cy = h - camHeight - offset;
  translate(cx, cy);
}

function drawCam(){
  if (!camReady){
    return;
  }
  push();
  camPosition(); // center the webcam
  scale(-1, 1); // mirror webcam
  image(capture, 
    -capture.scaledWidth * camSize, 0, 
    capture.scaledWidth * camSize, capture.scaledHeight * camSize
  ); // draw webcam
  scale(-1, 1); // unset mirror
  pop();
}