// README
/*
<Birds & Babies>
 Angelina Tran
 a98tran
 
 INSTRUCTIONS
 <explain what your program does and how to use it>
 What the program does: The goal of the game is to get as many eggs to "hatch" a baby bird. The game gets more difficult
 because the bird moves faster as the score increases. Slide your mouse over the slider to change the background colour.
 
 How to Play: Use the keys 'W', 'A', 'S', 'D' to move around the screen. Move towards the egg to hatch a baby bird. Stay 
 in the board and don't hit the baby birds, else the game will be over. The more eggs collected, the faster the bird will
 get When the game is over, hit SPACE to restart or click "Main Menu" to get back to the start screen. 
 
 CODING QUALITY AND VISUAL DESIGN
 <argue for your coding quality and visual design>
 I am very proud of my project and what is does. I think visually, I have done a pretty good job with the bird and baby 
 birds. I spent a lot of time creating them, and I did it in an efficient way by using user-defined functions. Using
 user-defined functions, make the overall draw function easier to comprehend without getting too confused with the many
 lines of code. Through out this program, I used many user-defined functions as it is more efficient and easier to understand
 the code since it is broken up from the main code. 
 
 I also used multiple variables throughout the game program because this allows for change to occur and for the game to be
 randomized every time the program is run. The variables are very important for the part I am most proud of. The part of my 
 program which I am most proud of is that I was able to perform a hit test for the egg and baby bird that are constantly being
 randomized. When the bird hit the egg, it would randomize and add a baby bird. The variable are important here because they 
 store the random location of each. 
 
 There was a part of my program that I did have trouble with, which is the movement of the bird. Though the visual of the actual
 bird was fairly simple to achieve, getting the movement of it was a little harder. What made it hard was getting the bird to move
 up and down, from side to side. Initially, the direction would adjust according to whichever key was pressed, but when it changed
 direction, it would reset to the starting position and move in the specified direction from there. It took me a few trial and errors
 playing with different variables, different conditional statements and booleans to get to the current point. Another issue I had
 was sometimes the baby bird generated too randomized too close or on the bird's position which resulting in the game ending when it
 was not the player's fault. I fixed this issue by using an if statement to randomize the position where to a location that would not 
 impact the game state.However, I am very happy with the result and that I was able to problem solve from my mistakes.
 
 Extended Concepts Used: Rectangle hit test, arrays, mouse and keyboard functions, loading and displaying images
 
 VIDEO
 <https://youtu.be/LRVKOu9atv4>
 
 RELEASE
 I <Angelina Tran> grant permission to CS 105 course staff to use
 my Final Project program and video for the purpose of promoting CS 105.
 <if you don't grant permission, erase the line above>
 */

// all code goes below here ....

// global variables - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let score = 0;

// egg
let imgEgg;
let eggSize = 60;
let eggPositionX;
let eggPositionY;

// game state
let gameStart = false;
let gameOver = false;

// bird
let xMiddle = 1024/2;
let yMiddle = 768/2;

let birdPositionX = xMiddle;
let birdPositionY = yMiddle; 
let birdSpeed = 1/2;

// arrays
let babyX = [];
let babyY = [];


// baby birds
let babySize = 60;
let baby = 0;

// directions
let up = true;
let down = false;
let right = false;
let left = false;

// background colour and bar
let backgroundColour = 0; // initial background colour
let colour = ['#ffdede', '#ffeadb', '#fff9db', '#e4ffd6', '#dbffe8', '#d9fdff', '#d4edff', '#dee7ff', '#e4e0ff', '#f7dbff', '#ffdbec']; // background colours
let brushColour = colour; 
const buttonSize = 20;

// set up - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function setup() {
  createCanvas(1024, 768);
  eggPositionX = random(30, width - eggSize);
  eggPositionY = random(30, height - eggSize);

  for (let i = 0; i < baby; i++) {
    babyX[i] = random(30, width - eggSize);
    babyY[i] = random(30, height - eggSize);
  }
}

// draw - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function draw() {
  // conditional statement - game state
  if (gameStart === false && gameOver === false) {
    background(colour[backgroundColour]); // depends on slider
    backgroundWidget(362, height/3 * 2 + 65);

    babyBird(width/2 - 80, height/3);
    bird(width/2, height/3);
    egg(width/2 + 50, height/3 - 20);

    fill(100); // dark grey
    noStroke();

    textAlign(CENTER, CENTER);
    textFont('Georgia');

    textSize(125);
    text("Birds & Babies", width/2, height/2);

    textSize(20);
    text("Use W A S D to move around", width/2, height/2 + 75);
    text("Collect the eggs to hatch a baby bird", width/2, height/2 + 100);
    text("Don't touch the edge of the screen and don't hit the baby birds", width/2, height/2 + 125);
    text("Hit SPACE to start", width/2, height/2 + 150);
    text("Slide to change background colour", width/2, height/3 * 2 + 100);
  } else if (gameStart === true || gameOver === false) {
    background(colour[backgroundColour]); // depends on slider

    // bird directions
    if (right === true) {
      birdPositionX = birdPositionX + 2 + (score * birdSpeed);
    } else if (left === true) {
      birdPositionX = birdPositionX - 2 - (score * birdSpeed);
    } else if (up === true) {
      birdPositionY = birdPositionY - 2 - (score * birdSpeed);
    } else if (down === true) {
      birdPositionY = birdPositionY + 2 + (score * birdSpeed);
    }

    // hit test for when bird hits the egg
    if (rectHitTest(birdPositionX, birdPositionY, eggPositionX, eggPositionY, eggSize, eggSize - 12)) {
      eggPositionX = random(30, width - eggSize);
      eggPositionY = random(30, height - eggSize);

      score = score + 1;
      baby = baby + 1;

      // loop - randomly generates position for baby birds
      for (let i = 0; i < baby; i++) { 
        babyX[i] = random(30, width - eggSize);
        babyY[i] = random(30, height - eggSize);

        // if baby bird randomizes on the same spot as the egg, randomizes to another location
        if (babyX[i] === eggPositionX || babyY[i] === eggPositionY) {
          babyX[i] = random(30, width - eggSize);
          babyY[i] = random(30, height - eggSize);
        }

        // if bird randomizes on the same spot as the egg, randomizes to another location
        if (babyX[i] === birdPositionX || babyY[i] === birdPositionY) {
          babyX[i] = random(30, width - eggSize);
          babyY[i] = random(30, height - eggSize);
        }

        // baby bird get randomized if too close to the bird
        if (babyX[i] < birdPositionX + 50 && babyX[i] > birdPositionX - 50 && babyY[i] < birdPositionY + 50 && babyY[i] > birdPositionY - 50) {
          babyX[i] = random(30, width - eggSize);
          babyY[i] = random(30, height - eggSize);
        }
      }
    }

    // drawing and hit test of baby bird
    if (score > 0) {
      for (let i = 0; i < baby; i++) {
        babyBird(babyX[i], babyY[i]);
        if (rectHitTest(birdPositionX, birdPositionY, babyX[i] - 20, babyY[i] - 20, babySize, babySize)) {
          gameOver = true;      
          gameStart = false;
        }
      }
    }

    // score text
    textSize(25);
    textFont('Georgia');
    textAlign(CENTER, CENTER);
    fill(100); // dark grey
    text("Score:", 60, 30);
    text(score, 120, 30);

    // if bird goes off the screen
    if (birdPositionX > width - 20 || birdPositionX < 20 || birdPositionY > height - 20 || birdPositionY < 20) {
      gameOver = true;      
      gameStart = false;
    }

    egg(eggPositionX, eggPositionY); 
    bird(birdPositionX, birdPositionY);
  } else if (gameOver === true && gameStart === false) {
    // game over screen
    background(colour[backgroundColour]); // depends on slider
    fill(100); // dark grey
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(90);
    textFont('Georgia');
    text("GAME OVER", width/2, height/2 - 45);
    textSize(50);
    text("Final Score:", width/2 - 40, height/2 + 35);
    text(score, width/2 + 140, height/2 + 35);
    textSize(20);
    text("Press SPACE to play again", width/2, height - 50);

    // return to main menu option
    textSize(40);
    text("Main Menu", width/2, height/2 + 90);
    if (rectHitTest(mouseX, mouseY, width/2 - 105, height/2 + 75, 210, 40) && mouseIsPressed) {
      gameStart = false;
      gameOver = false;
    }

    // bird position reset
    birdPositionX = xMiddle;
    birdPositionY = yMiddle;
  }
}

// key pressed function - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function keyPressed() {
  // direction
  if (key === 'd' || key ==='D') {
    up = false;
    down = false;
    right = true;
    left = false;
  } else if (key === 'a' || key === 'A') {
    up = false;
    down = false;
    right = false;
    left = true;
  } else if (key === 'w' || key === 'W') {
    up = true;
    down = false;
    right = false;
    left = false;
  } else if (key === 's' || key === 'S') {
    up = false;
    down = true;
    right = false;
    left = false;
  }

  // start or reset game
  if (key === ' ') {
    gameStart = true;
    gameOver = false;
    if (gameStart === true || gameOver === false) {
      baby = 0;
      score = 0;
    }
  }
}

// loading image - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function preload() {
  imgEgg = loadImage("data/egg.png");
}


// user-defined functions
// egg  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function egg(x, y) {
  // displaying image
  image(imgEgg, x, y, eggSize, eggSize );
  noFill();
  noStroke(0);
  rect(x, y, eggSize, eggSize - 12);
}

// rectangle hit test  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function rectHitTest(x1, y1, x2, y2, w, h) {
  if (x1 >= x2 &&  x1 <= x2 + w && y1 >= y2 && y1 <= y2 + h) {
    return true;
  } else {
    return false;
  }
}

// background colour slider - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function backgroundWidget(x, y) {
  // local variable
  let lineLength = 300;
  let numberColours = 10;
  let number = lineLength/numberColours;   

  // bar line
  strokeWeight(2);
  stroke(100); // dark grey
  line(x, y, x + lineLength, y);

  // jump brush
  if (mouseIsPressed && mouseX > x && mouseX < x + 300 && mouseY > y - buttonSize && mouseY < y + buttonSize) {
    backgroundColour = round((mouseX - x)/number );
  }

  // brush size value
  fill(255); // white
  ellipse(x + number * backgroundColour, y, buttonSize, buttonSize);
}

// draw with shapes and drawing attributes
// bird character - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function bird(x, y) {
  // legs
  stroke(0); // black
  strokeWeight(0.5);
  fill(0); // black
  line(x - 15, y + 25, x - 15, y + 48); // left feet
  line(x - 15, y + 40, x - 20, y + 45);
  line(x - 15, y + 40, x - 10, y + 45);
  ellipse(x - 15, y + 41, 2, 2);

  line(x + 15, y + 25, x + 15, y + 48); // right feet
  line(x + 15, y + 40, x + 20, y + 45);
  line(x + 15, y + 40, x + 10, y + 45);
  ellipse(x + 15, y + 41, 2, 2);

  noStroke();
  fill('#3656b5'); // dark blue
  ellipse(x - 15, y + 25, 10, 10); // left thigh
  ellipse(x + 15, y + 25, 10, 10); // right thigh

  // right wing
  ellipse(x + 26, y, 18, 12);
  triangle(x + 16.5, y, x + 35.5, y, x + 26, y + 17);

  // bird hair
  stroke('#7598ff'); // light blue
  line(x, y - 20, x, y - 40);
  line(x - 10, y - 20, x - 10, y - 35);
  line(x + 10, y - 20, x + 10, y - 35);

  noStroke();
  fill('#3656b5'); // dark blue
  ellipse(x, y - 40, 4, 4);
  ellipse(x - 10, y - 35, 4, 4);
  ellipse(x + 10, y - 35, 4, 4);

  // body
  fill('#7598ff'); // light blue
  ellipse(x, y, 60, 60);

  // left wing
  fill('#3656b5'); // dark blue
  ellipse(x - 26, y, 18, 12);
  triangle(x - 16.5, y, x - 35.5, y, x - 26, y + 17);

  // beak
  fill('#f7ce45'); // pale golden yellow
  triangle(x + 9, y - 9, x + 19, y - 5, x + 9, y - 5);
  fill('#f7b645'); // pale orange
  triangle(x + 9, y - 5, x + 9, y - 1, x + 16, y - 5);

  // blush
  fill('#ffbdb0'); // pale pink
  ellipse(x - 6, y - 6, 7, 7); // left
  ellipse(x + 24, y - 7, 7, 7); // right

  // eyes
  stroke(255); // white
  strokeWeight(0.5); 
  fill(0); // black
  ellipse(x, y - 15, 6, 6); // left
  ellipse(x + 18, y - 15, 6, 6); // right

  fill(255); // white
  noStroke();
  ellipse(x + 1, y - 16, 2, 2); // left
  ellipse(x + 19, y - 16, 2, 2); // right
}

// baby bird - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function babyBird(x, y) {
  //right wing
  fill('#8975bf'); // dark purple
  ellipse(x + 17, y, 7, 6);
  triangle(x + 17, y - 3.25, x + 17, y + 3.25, x + 23, y);

  // feet
  fill('#8975bf'); // dark purple
  ellipse(x - 7, y + 16, 7, 7); // left
  ellipse(x + 7, y + 16, 7, 7); // right

  // bird hair
  stroke('#bfb0e8'); // light purple
  line(x, y - 10, x, y - 23);
  fill('#8975bf'); // dark purple
  ellipse(x, y - 23, 3, 3);

  // body
  fill('#bfb0e8'); // light purple
  noStroke();
  ellipse(x, y, 36, 36);

  //left wing
  fill('#8975bf'); // dark purple
  ellipse(x - 17, y, 7, 6);
  triangle(x - 17, y - 3.25, x - 17, y + 3.25, x - 23, y);

  // beak
  fill('#f7ce45'); // pale golden yellow
  triangle(x + 2, y - 2, x + 2, y, x + 7, y);
  fill('#f7b645'); // pale orange
  triangle(x + 2, y + 1, x + 2, y, x + 6, y);

  // eyes
  stroke(255); // white
  strokeWeight(0.5); 
  fill(0); // black
  ellipse(x - 3, y - 5, 7, 7);
  ellipse(x + 8, y - 5, 7, 7);
  noStroke();
  fill(255);
  ellipse(x - 2, y - 6, 3, 3);
  ellipse(x + 9, y - 6, 3, 3);

  // blush
  fill('#ffbdb0'); // pale pink
  ellipse(x - 7, y, 4, 4);
  ellipse(x + 12, y, 4, 4);

  noFill();
  rect(x - 20, y - 20, babySize, babySize); // hit test reference
}
