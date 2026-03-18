// Caroline DiMaio
//dimaio.ca@northeastern.edu
//ARTG2262 Lab 6 "Function"
// Assignment 3: Self Portrait

function setup() {
  createCanvas(600, 550); // set size of canvas to draw on
  
}
function draw() {
  
  background('hotpink'); // pink background
  
  //hair
  fill('#361B11'); // dark brown
  noStroke(0); // no stroke
  ellipse(300,280,200,300); // x,y, width, height
  
  
  //head
  fill('tan'); // set color of skin
  strokeWeight(0); // no stroke
  ellipse(300,260,160,200); // x,y, width, height
  
   //neck
  fill('tan'); // set color of skin
  strokeWeight(0); // no stroke
  rect(280,350,40,40); // x, y, width, height
 
  //eyebrows
  stroke('#361B11'); // dark brown
  strokeWeight(5); // thickness of eyebrow
  //left eyebrow 
  arc(267, 215, 50, 25, PI + 0.2, TWO_PI - 0.2); // (x, y, width, height, starting angle of arc, ending angle of arc)
  //right eyebrow
  arc(335, 215, 50, 25, PI + 0.2, TWO_PI - 0.2); // (x, y, width, height, starting angle of arc, ending angle of arc)

  
  //eyes
  fill('white'); // set white for eye shape
  strokeWeight(1); 
  stroke('black'); // set black outline for eye
  ellipse(267,230,40,20); // coordinates for left eye
  ellipse(335,230,40,20); // coordinates for right eye
  
  
  fill('#361B11'); // set color of eye to brown
  strokeWeight(2);  // weight of eye outline
  stroke('black'); // black outline for eye
  circle(267,230,20); // left eye
  circle(335,230,20); // right eye
  
  fill('black'); // set black for pupil of eyes
  circle(270,227,10); // left pupil
  circle(338,227,10); // right pupil 
  
  fill('white'); // set white for eye reflection
  circle(272,225,3); //left reflection
  circle(340,225,3); // right  reflection
  
  //lips
  fill('hotpink');//lip color
  noStroke(); // no outline
  

  beginShape();//top of mouth
  vertex(270,300); // left corner of mouth
  bezierVertex(285,290 // 1st control point - pulls curve upward
               ,295,290, // 2nd control point - pulls curve upward
               300,295);  // ends middle of mouth
  
  bezierVertex(305,290,// pulls curve upward on right side
               315,290, // pulls curve upward on right side 
               330,300); //right corner of mouth 
  endShape();
  
  beginShape();// drawing bottom of mouth
  vertex(270,300); //left corner of mouth
  bezierVertex(285,330, // pulls curve downward
               330,315, // pulls curve downward
               330,300); // right corner of mouth 
  
  endShape();
  
  //t-shirt
  fill('black'); // t-shirt is black
  noStroke(); // no outline
  beginShape(); 
  vertex(220,400); // left shoulder of shirt 
  bezierVertex(190,420,// left side curve outward
               180,520, // curve down
               220,600); // bottom left of shirt
  
  bezierVertex(260,640, // bottom left curve
               340,640, // bottom right curve
               380,600); // bottom right of shirt
  
  bezierVertex(420,520, // right side upward curve
               410,420, // curve towards shoulder
               380,400); // right shoulder of shirt
  
  bezierVertex(350,390, // neckline curve on the right
               250,390, // neckline curve on the left
               220,400); // meet back at left shoulder
  endShape();
  
  //Name
  fill(0); // black text
  noStroke(); // no outline
  textSize(32); // set text size
  textAlign(CENTER); // center text horizontally on canvas 
  text("Caroline DiMaio", width/2, 50); // put text at top center of canvas
  
  
}