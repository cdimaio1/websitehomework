// Caroline DiMaio
//ARTG2262 Lab: 06 - Function
//dimaio.ca@northeastern.edu
// Assignment 4 : "Decorative Pattern"
// "spikes"
function setup() {
  createCanvas(1040,1040); // create 1040 pixel x 1040 pixel canvas
  background('hotpink'); // hot pink background
  noLoop(); // so draw function does not repeat
}
function draw() {
  strokeWeight(4); // thickness of lines 
  
  let xwidth = 20; // width of each zig-zag
  let xspace = 30; // space between rows of zig-zags
  let xheight = 20; // height of each zig-zag
  
  for (let y = 0; y < height; y += xspace){ // loop that repeats for the whole canvas
    
    if ((y/xspace) % 2 === 0){ // conditional that changes color every row
      stroke('purple'); // purple line color
      fill('black'); // black circle color
    } else{
      stroke('orange'); // orange line color
      fill('white'); // white circle color
    }
    
    for (let x = 0; x < width; x += xwidth){ // loop that draws zig-zag lines across the canvas
      line(x, y, x + xwidth/2, y + xheight); // left side of zig-zag
      line(x +xheight/2, y + xheight, x +xheight, y); // right side of zig-zag
    }
    
    for (let x = xwidth/2; x < width; x+= xwidth){ // loop that draws circles on each zig-zag
      circle(x,y + xheight, 16); // draws a circle on the bottom of the v shape
    }
  }
}
/** // taken from assignment:
* A function to define what to do whenever a key
* is pressed over the canvas.
*/
function keyPressed() { // 
// Was it the upper/lower 'S' key?
if (key == 'S' || key == 's') {
saveCanvas("assignment[3]_pattern_dimaio_caroline");
}
}
