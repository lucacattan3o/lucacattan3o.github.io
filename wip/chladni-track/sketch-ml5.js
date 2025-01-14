
let ml5Model, ml5Video;
let ml5VideoReady = false;
let ml5Poses;
let ml5CamWidth, ml5CamHeight;
let ml5CamZoom, ml5CamWider;

function ml5Preload(){
  ml5Model = ml5.handPose({
    flipped: true,
    maxHands: 2,
  });
}

function ml5Capture(){
  ml5Video = createCapture(VIDEO, {flipped: true}, () => {
      ml5setCameraDimensions(ml5Video);
      ml5VideoReady = true;
    }
  );
  ml5Video.hide();
  ml5Model.detectStart(ml5Video, ml5GotPoses);
}

function ml5setCameraDimensions(ml5Video) {
  // aspect ratio of the ml5Video
  let vidAspectRatio = ml5Video.width / ml5Video.height; 
  // aspect ratio of the canvas
  let canvasAspectRatio = width / height; 

  if (vidAspectRatio > canvasAspectRatio) {
    // Image is wider than canvas aspect ratio
    ml5CamHeight = height;
    ml5CamWidth = ml5CamHeight * vidAspectRatio;
    ml5CamWider = true;
  } else {
    // Image is taller than canvas aspect ratio
    ml5CamWidth = width;
    ml5CamHeight = ml5CamWidth / vidAspectRatio;
    ml5CamWider = false;
  }

  // full screen size
  ml5CamZoom = ml5CamWidth / ml5Video.width;
}

function ml5Stop(){
  if (ml5Model){
    ml5Model.detectStop();
  }
}

function ml5GotPoses(results){
  ml5Poses = results;
}

function ml5TranslateToCenter(){
  if (!ml5VideoReady){
    return;
  }
  if (ml5CamWider){
    let offsetX = (width - ml5CamWidth) / 2;
    translate(offsetX, 0);
  } else {
    let offsetY = (height - ml5CamHeight) / 2;
    translate(0, offsetY);
  }
}

function ml5DrawCam(){
  if (!ml5VideoReady){
    return;
  }
  image(ml5Video, 0, 0, ml5CamWidth, ml5CamHeight);
}

function ml5DrawKeypoints(){
  if (!ml5Poses){
    return;
  }
  if (ml5Poses.length == 0){
    return;
  }

  push();
    ml5Poses.forEach(pose => {
      if (pose.confidence > 0.5){
        pose.keypoints.forEach(point => {
          noStroke();
          fill(255);
          circle(point.x * ml5CamZoom, point.y * ml5CamZoom, 10);
        })
      }
    });
  pop();
}

function ml5CamMask(){
  rect(0, 0, ml5CamWidth, ml5CamHeight);
}