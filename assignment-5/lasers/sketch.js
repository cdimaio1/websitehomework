//Caroline DiMaio
//dimaio.ca@northeastern.edu
//ARTG 2262 - Lab 06
// Assignment [5] "Screensaver" : Lasers

let numLasers   = 8;      // number of lasers 
let trailFade   = 18;     // length/opacity of the trail - lower is longer/ more faint
let minSpeed    = 2;      // slowest a laser can move
let maxSpeed    = 5;      // fastest a laser can move
let minThick    = 1;      // thinnest laser line
let maxThick    = 3;      // thickest laser line


// arrays
let lx  = [];   // current x position
let ly  = [];   // current y position
let lvx = [];   // x velocity
let lvy = [];   // y velocity
let lr  = [];   // red value
let lg  = [];   // green value
let lb  = [];   // blue value
let lw  = [];   // line thickness


function setup() {
  createCanvas(windowWidth, windowHeight); // fill browser window
  initLasers();
}

function windowResized() { // if user resizes browser the program will resize according to the new width and height
  resizeCanvas(windowWidth, windowHeight);
  // re-init so positions stay inside the new canvas size
  initLasers();
}

// 
function draw() {
  
  background(0, trailFade); // black background, low opacity

  moveLasers();
  drawLasers();
  drawClock();
  
  
}

function initLasers() {
  // Clear arrays first 
  // loop runs once per laser
  
  lx  = []; ly  = [];
  lvx = []; lvy = [];
  lr  = []; lg  = []; lb = [];
  lw  = [];
  // i starts at 0 and goes to 8
  for (let i = 0; i < numLasers; i++) {
// Random 
    // push will add one new value to array each time
    lx.push(random(width)); // picks random number between 0 and canvas width to define x position
    ly.push(random(height)); // picks random number between 0 and canvas height to define y position

    // Random angle → split into vx/vy using cos/sin 
    let angle = random(TWO_PI); // picks a random number within a full circle - 6.28 
    let speed = random(minSpeed, maxSpeed); // random speed between 2 and 5... min and max defined the top
    lvx.push(cos(angle) * speed); // pushes into lvx array. cos = right/left, between -1 and +1 (multiply by speed)
    lvy.push(sin(angle) * speed); // pushes into lvy  array. sin = up/down, between -1 and +1 (multiply by speed)

    // Each laser gets a random color
    // One channel is maxed, one is random, one is low
    let colors = randomLaserColor(); // picks random color, returns as three values and stores it in colors [0,1,2]
    lr.push(colors[0]);// takes first color adds to lr list
    lg.push(colors[1]); // takes second color adds to lg list
    lb.push(colors[2]); // takes third color adds to lb list

    lw.push(random(minThick, maxThick)); // picks random thickness (1 to 3) and saves to lw list
  }
}

// Picks a color using RGB
function randomLaserColor() { 
  let pick = floor(random(3)); // 0 = red laser, 1 = green, 2 = blue/cyan/magenta
  // random(3) picks random number 1 to 3, floor gets rid of decimal 
  if (pick == 0) return [255,random(0, 80),random(100, 255)]; // red/pink/magenta
  if (pick == 1) return [random(0, 80), 255,random(100, 255)]; // green/cyan
  else           return [random(0,150), random(0,150), 255             ]; // blue/purple
}

function moveLasers() {
 for (let i = 0; i < numLasers; i++) { // runs everything inside once per laser (8 times)
    lx[i] += lvx[i]; // add the velocity to lasers current position
    ly[i] += lvy[i];
   // moves the laser further in whatever direction its going 
   // lx = 100, lvx = 3, then lx becomes 103; drifts 3 pixels

    // Bounce off left/right walls — flip x velocity
    if (lx[i] < 0 || lx[i] > width) { // if laser went off the left or right edge of canvas... 
     lvx[i] *= -1; // flip the x velocity , multiply by -1
    }
   // lvx = 3 (moving right) , *= -1, becomes -3 (moves left)
   
    // Bounce off top/bottom walls — flip y velocity
    if (ly[i] < 0 || ly[i] > height) { // if laser goes off top or bottom edge...
      lvy[i] *= -1; // flip y velocity to reverse direction
    }
  }
}

function drawLasers() {
  // Draw a line from every laser to every other laser, do all possible combinations
  for (let i = 0; i < numLasers; i++) {
    for (let j = i + 1; j < numLasers; j++) { // i = A j = B draw line from A to B

      // measure how far apart the two dots are
      let d = dist(lx[i], ly[i], lx[j], ly[j]);
      let maxDist = width * 0.5; // maxDist is half screen width
      if (d < maxDist) { // only draw a beam if the lasers are close enough to keep it organized
        
        // Fade the laser brightness based on distance 
        // closer the lasers, brighter the beam
        //further lasers, light fades more
        // 200 = laser is at its brightest
        // 0 = laser is invisible
        let alpha = map(d, 0, maxDist, 200, 0); 

        // Laser beam color is a mix of the two dots it mixes 
        let blendR = (lr[i] + lr[j]) / 2; // Average the Red value of laser i and j 
        let blendG = (lg[i] + lg[j]) / 2; // average the red value of laser i and j
        let blendB = (lb[i] + lb[j]) / 2; // average the green value of laser i and j

        stroke(blendR, blendG, blendB, alpha); // sets colors for beams
        strokeWeight(lw[i]); // thickness of beam 
        line(lx[i], ly[i], lx[j], ly[j]); // draws straight line from laser i position to laser j position 
      }
    }

    // Draw the laser dot 
    noStroke(); // no outline 
    fill(lr[i], lg[i], lb[i]); // fill using lasers colors
    circle(lx[i], ly[i], lw[i] * 4); 
    // lx[i] and ly[i] = laser current position
    // lw[i] = thickness of laser (between 1 and 3); multiply by 4 gives a diameter between 4 and 12 px 

    // Draw a soft glow ring around each dot
    fill(lr[i], lg[i], lb[i], 60); // 255 would be fully opaque, 60 is faint color for glow effect 
    circle(lx[i], ly[i], lw[i] * 14);// take x and y position of laser, multiply thickness of laser by much larger value than its diameter, 14 will always work
    
  }
}
function drawClock() { // taken from in class, slightly modified for 12 hr format instead of 24
  fill(255, 220);
  textSize(14);
  textAlign(LEFT, TOP);
  
  let h = hour(); // gets current hour in 24 hr format 
  let h12 = h % 12; // mod, converts 24 hr to 12; 13% 12 = 1
  if (h12 == 0) h12 = 12; // % 12 turns midnight (0) and noon (12) into 0 
  let ampm;
    if (h < 12) {
      ampm = "AM";
      
    } else {
      ampm = "PM"
    }
    // if hour is less than 12, its AM , otherwise PM 

  let dateStr = nf(month(), 2) + "/" + nf(day(), 2) + "/" + year();
  // builds date string (taken from class example)
  let timeStr = nf(h12, 2) + ":" + nf(minute(), 2) + ":" + nf(second(), 2) + " " + ampm ;
  // builds time string (taken from class example) added 12 hr format

  text(dateStr, 16, 16); // draw date 16 pix from left and top
  text(timeStr, 16, 34); // draw time 16 pix from left and 34 pix from top
}
