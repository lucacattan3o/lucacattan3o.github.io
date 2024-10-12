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

    filter(GRAY);
    scale(-1, 1); // unset mirror
  pop();
}

function drawFeedback(){
  /* TRACKING */
  if (mediaPipe.landmarks[0] && mediaPipe.landmarks[1]) { // is at least one hand tracking ready?

    let camW = capture.scaledWidth * camSize;
    let camH = capture.scaledHeight * camSize;

    let delta = 0;

    // index finger 1
    let index1X = map(mediaPipe.landmarks[0][delta].x, 1, 0, 0, camW);
    let index1Y = map(mediaPipe.landmarks[0][delta].y, 0, 1, 0, camH);

    // index finger 2
    let index2X = map(mediaPipe.landmarks[1][delta].x, 1, 0, 0, camW);
    let index2Y = map(mediaPipe.landmarks[1][delta].y, 0, 1, 0, camH);

    camA = 1 - mediaPipe.landmarks[0][delta].y;
    camB = 1 - mediaPipe.landmarks[1][delta].y;

    // center point between index1 and index2
    let centerX = (index1X + index2X) / 2;
    let centerY = (index1Y + index2Y) / 2;

    // distance between index1 and index2
    let distance = dist(index1X, index1Y, index2X, index2Y);

    push();
    camPosition();

    // draw fingers
    fill(palette[1]);
    noStroke();
    drawPos(index1X, index1Y); // index finger
    drawPos(index2X, index2Y); // thumb

    // fingers touch
    if (distance < 100) {
    }

    pop();
  }
}

function drawPos(x, y){
  push();
    let lineSize = 10;
    stroke(255)
    translate(x, y);
    translate(0, -20);
    line(-lineSize, 0, lineSize, 0);
    line(0, -lineSize, 0, lineSize);
  pop();
}