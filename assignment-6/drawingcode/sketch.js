// Caroline DiMaio
// ARTG2262 Assignment #6: Drawing App
// dimaio.ca@northeastern.edu
// App instructions:
// To draw circles on canvas: hold & drag mouse
// To change brush size: mouse wheel or [] 
// to erase : press the E key
// to clear the canvas : press the R key
// to save your drawing : press S key

//Auto Features:
// brush size with softly pulse on its own
// color cycles through the rainbow

// user toolbar height
const toolbar = 70;

// stores curent color as a hue (# 0-360)
// starts at 0 (red) and increases each frame to go through the whole rainbow
let hueVal = 0;

 
let baseSize   = 24; // brush size user controls
let brushSize  = 24; // actual size used to draw ( baseSize + pulse animation)
let pulseAngle = 0; // number used for pulse 


let eraserOn = false; // true/false to track whether eraser mode is active
const eraserSize = 40; // size of erase


let canvas; // separate drawing surface so toolbar can refersh every frame without wiping the drawing

function setup() {
  createCanvas(800, 520); // creates main window
  colorMode(HSB, 360, 100, 100, 100);// uses HSB 
  canvas = createGraphics(800, 520 - toolbar); // create the drawing canvas... same width but shorter by height of toolbar (70px)
  canvas.colorMode(HSB, 360, 100, 100, 100);// colors for the drawing canvas
  canvas.background(0, 0, 96); // no hue, no saturation, 96% brightness 
  // starts with light grey 
  textFont("monospace"); // typeface used for all text
}

function draw() {
  // increases hue by 0.6 by each frame
  // %360 brings value back to 0 when it hits 360 to continue rainbow loop 
  hueVal = (hueVal + 0.6) % 360; 

  // pulse angle increases slightly each frame
  pulseAngle += 0.05;
  // return users brush size value -6 or +6 for pulse effect
  brushSize = baseSize + sin(pulseAngle) * 6;

  //check 2 things : is mouse being held down AND is it below the toolbar 
  // don't want user to draw while in the toolbar
  if (mouseIsPressed && mouseY > toolbar) {
    // bx and by are coordinates on drawing canvas
    let bx = mouseX;
    // subtract toolbar from y coodinate to line it up correctly
    let by = mouseY - toolbar;

    canvas.noStroke(); // turns off the outline 
    if (eraserOn) { // if the eraser mode is on, paint a grey circle (same color as background) to "erase" whatever was drawn 
      canvas.fill(0, 0, 96); // grey = background color
      canvas.circle(bx, by, eraserSize);
    } else { // if eraser mode not on:
      canvas.fill(hueVal, 85, 95, 75); // draw a colored circle
      // use hueVal, 85% saturation, 95% brightness, and 75% opacity
      canvas.circle(bx, by, brushSize);
    }
  }

  //puts the drawing canvas on the main canvas
  // y value lets it sit below the toolbar
  image(canvas, 0, toolbar);

  // function to put the toolbar on top 
  drawToolbar();

  // makes sure the cursor cirlce only appears when mouse is below toolbar
  if (mouseY > toolbar) {
    noFill();// no color inside circle
    stroke(0, 0, 20, 60); // no hue, no saturation, 20% brightness (dark grey) 60% opacity ( sorta see through)
    strokeWeight(1.5); // outlines 1.5 pixels wide
    if (eraserOn) {
  circle(mouseX, mouseY, eraserSize);
} else {
  circle(mouseX, mouseY, brushSize);
} // draws the preview circle at the mouse (x,y) position
    // if the eraserOn is true, use eraserSize; If not, user brushSize
  }
}

function drawToolbar() { // draws toolbar
  noStroke();
  fill(0, 0, 15); // dark background bar on top of canvas
  rect(0, 0, width, toolbar);

  // color swatch
  fill(hueVal, 85, 95); //draws colored square swatch to show current brush color
  rect(10, 12, 46, 46, 6); // 6 rounds corners
// text
  fill(0, 0, 90); // sets text color, no hue, no saturation, 90% brightness (light grey) 
  noStroke(); // no outline on text
  textSize(12); // typeface size
  textAlign(LEFT, TOP);// x and y position of text
  // nf shows number neatly
  //nf(brushSize, 1, 1) = show at least 1 digit before decimal and 1 decimal after
  // avoiding ex: 23.000008, want: 24.0
  text("Size:  " + nf(brushSize, 1, 1) + "px  (auto-pulsing)", 70, 16); // 
  //if eraserOn = true; show Mode:Eraser to tell user 
  // if eraserOn is fale; show Mode:Draw 
  // label updates if you press E
  text(eraserOn ? "Mode:  ERASER  (E to switch)" : "Mode:  DRAW    (E for eraser)", 70, 38);

  fill(0, 0, 55); // 55 brightness , dimmer grey for key guide on toolbar
  textSize(11); // type size , smaller 
  textAlign(RIGHT, CENTER); // right edge of text and vertically center on y position 
  // draws the keyboard shortcuts 
  text("[ ] or scroll = size   E = eraser   R = clear   S = save", width - 10, toolbar / 2);
  // width - 10 places 10 px away from right edge
  //toolbar/2 puts it in vertical middle of toolbar
}

function mousePressed() {// starts once user clicks mouse
  // makes sure user clicking below the toolbar 
  // if below toolbar, start mouseDragged
  // need that bc mouseDXragged only runs when the mouse is moving while held. so if user only clicked once, but didnt drag then it would draw nothing
  if (mouseY > toolbar) mouseDragged();
}

function mouseDragged() { // goes repeatedly while holding and moving mouse
  // actual drawing happens inside draw()
}

function mouseWheel(event) { // starts when user scrolls mouse wheel 
  //event.delta tells how far and what direction the wheel moved
  // if its scrolling down = positive number; negative = scrolling up 
  // scroll down = posiitve delta = subtracting it shrinks the brush
  // scroll up = delta negative = subtracting a negative increases brush size
  baseSize = constrain(baseSize - event.delta * 0.05, 6, 80);
  // .05 slows it down so brush does not make big jumps when scrolling
  // same constrain as the [], keep in 6-80 range
  return false; // tells browser to not do normal scroll behavior
  // want the scroll to only affect the brush size, NOT moving the browser up and down 
}

function keyPressed() {
  // turn eraser on and off
  // ! flips boolean - if it was true turn it to false, vice versa
  if (key === "e" || key === "E") eraserOn = !eraserOn;
  // clears drawing canvas by refilling with grey background
  if (key === "r" || key === "R") canvas.background(0, 0, 96);
  // download the drawing as a PNG file
  if (key === "s" || key === "S") saveCanvas("my_drawing", "png");
  // take baseSize and subtract 4; dont let it go below 6 or above 80 
  // so brush wont go below size 6 or above size 80
  // if user presses [ , brush gets smaller (-4)
  if (key === "[") baseSize = constrain(baseSize - 4, 6, 80);
  // if user presses ], brush gets larger (+4)
  if (key === "]") baseSize = constrain(baseSize + 4, 6, 80);
}
