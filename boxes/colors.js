const colors = [
  {
    r: 255,
    g: 0,
    b: 84
  },
  {
    r: 255,
    g: 84,
    b: 0
  },{
    r: 255,
    g: 189,
    b: 0,
  }
];

function getColorVariation(key){
  let color = {}
  color.r = colors[key].r + random(-20, 20);
  color.g = colors[key].g + random(-20, 20);
  color.b = colors[key].b + random(-20, 20);
  color.alpha = random(100, 255);
  return color;
}