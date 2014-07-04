## This works as a normal apache static serving files
But you can easily change the Bandwidth.

How to install
Using NPM

npm install bwlim
npm install forever -g (to run the script forever)

Create a file called index.js
var bandwidth_bit_ps = 100; //bits per second
var server = require("bwlim").bwlim(__dirname,bandwidth_bit_ps);


