#Sketch 14

Flow Field

Lately I've been experimentig with reproducing some phisical behaviour through coding.
Thanks to the incredible work of Daniel Shiffman (@the.coding.train) in his series The Nature of Code (what a nice title).

A flow field is a simulation af a grid of forces pointing in different directions.
Each force is described by a vector with magnitude and angle: their values can be obteined with the noise function (to avoid excessive randomness) and can be changed trought time (2).

With this set up, you can add a lot a particles to scene!

A particle is a basic simulation of a body: position, velocity and acceleration with the ability to react to a force applied.
The force applied changes the acceleration, the acceleration changes the velocity, the velocity updates the position (UH): a simple but effective simulation af a body moving in space (3 and 4).

Drawing the position of all particles moving trough the flow field will result in this natural visualisation (1).

All written in vanilla javascript and p5.js.

`#creativecoding #processing #p5js #generative`