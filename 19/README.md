#Sketch 19

This summer in Denmark, on rainy days, I started working on this tool to represent the HSB color space. Piergiuseppe Molinar (@70magenta) sent me several documents on color theory during those days, and I absorbed everything with great curiosity.

HSB stands for hue, saturation and brightness: it is a far more human-friendly way of describing color than RGB (red, green, blue).

The tool is created in #p5.js in #WEBGL (3D) mode.
The color space is represented as a cylinder made up of many small colored spheres.

. Hue is represented by the angle of rotation of each element, from 0 to 360°;
. Saturation is represented by the distance from the center of each circle: at the center the saturation is 0, at the outside it is 100%;
. Brightness is represented by the vertical position of each element. At the top it is 100, at the bottom it is 0;

Thanks to lil-gui (a very simple and powerful library that generates controllers on the right) it is possible to control and modify:

. how many parts to divide the space according to the three parameters;
. the position and size of the spheres and cylinder;
. the animation and in particular the delay based on the various parameters (this is the part that I enjoy the most).

Link in bio to play with it

`#creativecoding #processing #p5js #generative #creativecodeart #webgl #colors #hsb #rgb`