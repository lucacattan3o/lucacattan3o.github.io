#Sketch 14

Flow Field

Lately I'm facinated about reproducing some phisics behaviour through coding.
Thanks to the incredible work of Daniel Shiffman in his series The Nature of Code (what a beautifull title).

A flow field is a simulation af a grid of forces pointing in different direction.
Each force is described by a vector with magnitude and angle: their values are obteined with the noise function and they are changing trought time (2).

With this set up, you can add to scene a lot a particles!

A particle is a simulation of a body (position, velocity, acceleration) with the ability to react to a force applied.
The force applied changes the acceleration, the acceleration changes the velocity, the velocity updates the position (BOOM): a simple but effective simulation af a body moving in space (3).

Drawing the position of all the particles moving trough the flow field will results in this natural visualisation (1).

All writtin in vanilla javascript and p5.js.

`#creativecoding #processing #p5js #generative`