#Sketch 14

Flow Field

[1] Lately I've been experimenting with reproducing phisical behaviours through coding.
Thanks to the incredible Daniel Shiffman's work (@the.coding.train) in his series The Nature of Code (what a nice title).

[2] A flow field is a simulation af a grid of forces pointing in different directions.
Each force is described by a vector with magnitude and angle: their values can be obtained with the noise function (to avoid excessive randomness) and can be changed trought time.

With this set up, you can add a lot a particles to the scene!

[3] A particle is a basic simulation of a body: position, velocity and acceleration with the ability to react to a force applied.
The force applied changes the acceleration, the acceleration changes the velocity, the velocity updates the position (UH): a simple but effective simulation af a body moving in space.

[4-7] Drawing the position of all particles moving trough the flow field will result in these natural visualisations.

All written in vanilla javascript and p5.js.

`#creativecoding #processing #p5js #generative #flowfield`