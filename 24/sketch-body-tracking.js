// webcam variables
let capture; // our webcam
let captureEvent; // callback when webcam is ready

let camReady = false;
let camSize = 0.2;
let camW;
let camH;

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
      // console.log(captureEvent.getTracks()[0].getSettings());
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

  camW = capture.scaledWidth * camSize;
  camH = capture.scaledHeight * camSize;
}

function camPosition() {
  let offset = 0;
  let cx = offset;
  let cy = h - camH - offset;
  translate(cx, cy);
}

function drawCam(){
  if (!camReady){
    return;
  }
  push();
    camPosition(); // center the webcam
    scale(-1, 1); // mirror webcam
    image(capture, -camW, 0, camW, camH); // draw webcam
    filter(GRAY);
    scale(-1, 1); // unset mirror
  pop();
}

function drawFeedback(){
  /* TRACKING */
  // two hands tracking
  if (mediaPipe.landmarks[0] && mediaPipe.landmarks[1]) {

    let lm0 = mediaPipe.landmarks[0];
    let lm1 = mediaPipe.landmarks[1];

    if (lm0[5].x < lm1[5].x){
      lm0 = mediaPipe.landmarks[1];
      lm1 = mediaPipe.landmarks[0];
    }

    camA = 1 - lm0[5].y;
    camB = 1 - lm1[5].y;

    push();
    camPosition();

    // draw fingers
    fill(palette[1]);
    noStroke();

    for (i = 0; i < 2; i++){
      let lm = mediaPipe.landmarks[i];
      drawFinger(lm, 2, 4);
      drawFinger(lm, 5, 8);
      drawFinger(lm, 9, 12);
      drawFinger(lm, 13, 16);
      drawFinger(lm, 17, 20);
      drawPalm(lm);
    }

    text(scaleLow[fM - 1], 10, camH - 10);
    text(scaleHig[fN - 1], camW - 30, camH - 10);

    pop();
  }
}

function getTrackPointCamPos(landmarks, delta){
  let p = landmarks[delta];
  let x = map(p.x, 1, 0, 0, camW, true);
  let y = map(p.y, 0, 1, 0, camH, true);
  return  {
    x: x,
    y: y
  }
}

function drawPalm(landmarks){
  let items = [
    0, 1, 2, 5, 9, 13, 17
  ];
  for (let i = 0; i < items.length; i++) {
    let from = items[i];
    let to = 0;
    if (items[i + 1] !== undefined){
      to = items[i + 1];
    }
    pointA = getTrackPointCamPos(landmarks, from);
    pointB = getTrackPointCamPos(landmarks, to);
    push();
      stroke(255);
      line(pointA.x, pointA.y, pointB.x, pointB.y);
    pop();
    push();
      translate(pointA.x, pointA.y);
      fill(255);
      noStroke();
      circle(0, 0, 5);
    pop();
  }
}

function drawFinger(landmarks, from, to){
  for (let i = from; i <= to; i++) {
    let p = getTrackPointCamPos(landmarks, i);
    let next = null;
    if (i !== to){
      next = getTrackPointCamPos(landmarks, i + 1);
    }
    if (next){
      push();
        stroke(255);
        line(p.x, p.y, next.x, next.y);
      pop();
    }
    push();
      translate(p.x, p.y);
      fill(255);
      noStroke();
      circle(0, 0, 5);
    pop();
  }
}

function drawPos(p){
  push();
    let lineSize = 10;
    stroke(255)
    translate(p.x, p.y);
    line(-lineSize, 0, lineSize, 0);
    line(0, -lineSize, 0, lineSize);
  pop();
}