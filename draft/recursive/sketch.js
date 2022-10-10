
let fps = 30;
let speed = 0.25;
let level = 0;

let colors = [
  '#000000',
  '#fca311',
  '#e5e5e5',
  '#ffffff',
];

let itemList = [];

recordSketch(false);

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  recordSketchSetFps(fps);
  background(255);
  branch(width / 2, height, 0);
  console.debug(itemList);
}

function setupItemList(){
  
  // for (let i = 0; i < 10; i++) {
  //   let item = new Item(tmpX, tmpY, i);
  //   itemList.push(item);
  //   tmpX = item.endX;
  //   tmpY = item.endY;
  // }
}

function branch(x, y, lev){
  // let item1 = new Item(tmpX, tmpY, level);
  // itemList.push(item1);

  if (lev < 3){
    // Branch: weight and color
    // strokeWeight(map(len, 10, 100, 1, 14));
    // stroke(color('#212529'));
    // 
    // // Draw the branch and traslate at the end of it
    // line(0, 0, 0, -len);
    // translate(0, -len);
    // 
    // // Rotate random to the left: new branch
    // rotate(random(-20, -30));
    // branch(len * random(0.7, 0.9));
    // 
    // // Rotate random to the right: new branch
    // rotate(random(50, 60));
    lev++;
    
    let item1 = new Item(x, y, lev);
    itemList.push(item1);
    branch(item1.xEnd, item1.yEnd, lev);
    
    let item2 = new Item(x, y, lev);
    itemList.push(item2);
    branch(item2.xEnd, item2.yEnd, lev);
    
  }
}

function draw() {
  background(255, 255, 255, 100);
  recordSketchPre();
  rectMode(CENTER);
  strokeCap(ROUND);

  itemList.forEach(item => {
    push();
      item.draw();
    pop();  
  });

  recordSketchPost(8);
}


