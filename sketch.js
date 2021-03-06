/*

The Game Project 5 - Bring it all together

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var tree_X
var clouds
var mountains
var collectables
var canyon

var game_score;
var flagpole;

var lives

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    lives = 3;
    startGame();
}

function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground
    
   
	// Draw clouds.
    drawClouds();

	// Draw mountains.
    drawMountains();

	// Draw trees.
    drawTrees();

	// Draw canyons.
    for(var i = 0; i < canyon.length; i++)
        {
            drawCanyon(canyon[i])
            checkCanyon(canyon[i])
        }


        

	// Draw collectable items.
    for(var i = 0; i < collectables.length; i++)
        {
            if(!collectables[i].isFound)
                {
                    drawCollectable(collectables[i])
                    checkCollectable(collectables[i])
                } 
        }
    
    renderFlagpole();
    
    
	// Draw game character.
	drawGameChar();
    textAlign(CENTER);
    fill(0);
    noStroke();
    textSize(30);
    text("score: " + game_score, width / 2, 30);
    text("lives: " + lives, width / 2, 60);
    
    if(lives < 1)
        {
            text("Game over. Press space to continue.", width / 2, height / 2);
            return;
        }
    if(flagpole.isReached)
        {
            text("Level Complete. You scored: " + game_score, width / 2, height / 2);
            return;
        }
	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}

	// Logic to make the game character rise and fall.
    
      if(gameChar_y < floorPos_y)
            {
                gameChar_y += 2.5;
                isFalling = true;
            }
        else
            {
                isFalling = false;
            }
    
    if(flagpole.isReached == false)
        {
            checkFlagpole();
        }
    
    checkPLayerDie();


	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
    

    
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed(){

	//console.log("press" + keyCode);
	//console.log("press" + key);

    if(keyCode == 37)
        {
            //console.log("left arrow");
            isLeft = true;
        }
    
    else if(keyCode == 39)
        {
            //console.log("right arrow");
            isRight = true;
        }
    
    if(keyCode == 32)
        {
            //console.log("space bar");
            isFalling = true;
        }
    
    if(keyCode == 32)
        {
            //console.log("space bar);
            gameChar_y -= 100;
        }
}

function keyReleased()
{

	//console.log("release" + keyCode);
	//console.log("release" + key);

    if(keyCode == 37)
        {
            //console.log("left arrow");
            isLeft = false;
        }
    
    if(keyCode == 39)
        {
            //console.log("right arrow");
            isRight = false;
        }    
}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
	// draw game character
    if(isLeft && isFalling)
	   {
            // add your jumping-left code

            //head
            noStroke();
            fill(255, 204, 123);
            ellipse(gameChar_x, gameChar_y - 60, 25, 25);
            //eyes
            fill(255);
            ellipse(gameChar_x - 5, gameChar_y - 65, 5, 5);
            fill(0);
            ellipse(gameChar_x - 5, gameChar_y - 65, 2.5, 2.5);

            //body 
            fill(255, 128, 0);
            rect(gameChar_x - 10, gameChar_y - 50, 20, 25)

            //arms
            fill(0);
            rect(gameChar_x - 5, gameChar_y - 50, 5, 15);
            fill(255, 204, 123)
            ellipse(gameChar_x - 2.5, gameChar_y - 35, 7, 7);

            //legs
            fill(102, 102, 0);
            rect(gameChar_x - 5, gameChar_y - 25, 7.5, 12);


            rect(gameChar_x - 5, gameChar_y - 15, 12, - -5)
            //feet
            fill(0);
            rect(gameChar_x + 7, gameChar_y - 15, 5, 10);

	   }
	else if(isRight && isFalling)
        {
            // add your jumping-right code    
            //head
            noStroke();
            fill(255, 204, 123);
            ellipse(gameChar_x, gameChar_y - 60, 25, 25);
            //eyes
            fill(255);
            ellipse(gameChar_x + 5, gameChar_y - 65, 5, 5);
            fill(0);
            ellipse(gameChar_x + 5, gameChar_y - 65, 2.5, 2.5);

            //body 
            fill(255, 128, 0);
            rect(gameChar_x - 10, gameChar_y - 50, 20, 25)

            //arms
            fill(0);
            rect(gameChar_x + 5, gameChar_y - 50, -5, 15);
            fill(255, 204, 123)
            ellipse(gameChar_x + 2.5, gameChar_y - 35, 7, 7);


            //legs
            fill(102, 102, 0);
            rect(gameChar_x + 5, gameChar_y - 25, - 7.5, 12)

            rect(gameChar_x - 7, gameChar_y - 15, 12, - -5)
            //feet
            fill(0);
            rect(gameChar_x - 7, gameChar_y - 15, 5, 10);

        }
	else if(isLeft)
        {
            // add your walking left code

            //head
            noStroke();
            fill(255, 204, 123);
            ellipse(gameChar_x, gameChar_y - 60, 25, 25);
            //eyes
            fill(255);
            ellipse(gameChar_x - 5, gameChar_y - 65, 5, 5);
            fill(0);
            ellipse(gameChar_x - 5, gameChar_y - 65, 2.5, 2.5);

            //body 
            fill(255, 128, 0);
            rect(gameChar_x - 10, gameChar_y - 50, 20, 25)

            //arms
            fill(0);
            rect(gameChar_x - 5, gameChar_y - 50, 5, 15);
            fill(255, 204, 123)
            ellipse(gameChar_x - 2.5, gameChar_y - 35, 7, 7);

            //legs
            fill(102, 102, 0);
            rect(gameChar_x - 5, gameChar_y - 25, 7.5, 20);
            //feet
            fill(0);
            rect(gameChar_x - 8, gameChar_y - 5, 11, 5);
        }
	else if(isRight)
        {
            // add your walking right code

            //head
            noStroke();
            fill(255, 204, 123);
            ellipse(gameChar_x, gameChar_y - 60, 25, 25);
            //eyes
            fill(255);
            ellipse(gameChar_x + 5, gameChar_y - 65, 5, 5);
            fill(0);
            ellipse(gameChar_x + 5, gameChar_y - 65, 2.5, 2.5);

            //body 
            fill(255, 128, 0);
            rect(gameChar_x - 10, gameChar_y - 50, 20, 25)

            //arms
            fill(0);
            rect(gameChar_x + 5, gameChar_y - 50, -5, 15);
            fill(255, 204, 123)
            ellipse(gameChar_x + 2.5, gameChar_y - 35, 7, 7);

            //legs
            fill(102, 102, 0);
            rect(gameChar_x + 5, gameChar_y - 25, - 7.5, 20)

            //feet
            fill(0);
            rect(gameChar_x + 8, gameChar_y - 5, - 11, 5)
        }
	else if(isFalling || isPlummeting)
        {
            // add your jumping facing forwards code
            
            noStroke();
            fill(255, 204, 123);
            ellipse(gameChar_x, gameChar_y - 60, 25, 25);

            //eyes
            fill(255);
            ellipse(gameChar_x - 5, gameChar_y - 65, 5, 5);
            ellipse(gameChar_x + 5, gameChar_y - 65, 5, 5);
            fill(0);
            ellipse(gameChar_x - 5, gameChar_y - 65, 2.5, 2.5);
            ellipse(gameChar_x + 5, gameChar_y - 65, 2.5, 2.5);

            //body 
            fill(255, 128, 0);
            rect(gameChar_x - 10, gameChar_y - 50, 20, 25)

            //arms
            fill(0);
            rect(gameChar_x - 15, gameChar_y - 50, 5, 15);
            rect(gameChar_x + 15, gameChar_y - 50, -5, 15);
            fill(255, 204, 123)
            ellipse(gameChar_x - 12.5, gameChar_y - 35, 7, 7);
            ellipse(gameChar_x + 12.5, gameChar_y - 35, 7, 7);

            //legs
            fill(102, 102, 0);
            rect(gameChar_x - 10, gameChar_y - 25, 7.5, 12);
            rect(gameChar_x + 10, gameChar_y - 25, - 7.5, 12)
            //feet
            fill(0);
            rect(gameChar_x - 13, gameChar_y - 15, 11, 5);
            rect(gameChar_x + 13, gameChar_y - 15, - 11, 5)
        }
	else
        {
            // add your standing front facing code

            //head
            noStroke();
            fill(255, 204, 123);
            ellipse(gameChar_x, gameChar_y - 60, 25, 25);
            //eyes
            fill(255);
            ellipse(gameChar_x - 5, gameChar_y - 65, 5, 5);
            ellipse(gameChar_x + 5, gameChar_y - 65, 5, 5);
            fill(0);
            ellipse(gameChar_x - 5, gameChar_y - 65, 2.5, 2.5);
            ellipse(gameChar_x + 5, gameChar_y - 65, 2.5, 2.5);

            //body 
            fill(255, 128, 0);
            rect(gameChar_x - 10, gameChar_y - 50, 20, 25)

            //arms
            fill(0);
            rect(gameChar_x - 15, gameChar_y - 50, 5, 15);
            rect(gameChar_x + 15, gameChar_y - 50, -5, 15);
            fill(255, 204, 123)
            ellipse(gameChar_x - 12.5, gameChar_y - 35, 7, 7);
            ellipse(gameChar_x + 12.5, gameChar_y - 35, 7, 7);

            //legs
            fill(102, 102, 0);
            rect(gameChar_x - 10, gameChar_y - 25, 7.5, 20);
            rect(gameChar_x + 10, gameChar_y - 25, - 7.5, 20)

            //feet
            fill(0);
            rect(gameChar_x - 13, gameChar_y - 5, 11, 5);
            rect(gameChar_x + 13, gameChar_y - 5, - 11, 5)
        }    
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds()
{
    push();
    translate(scrollPos, 0);
    for(var i = 0; i < clouds.length; i++)
        {
            noStroke();
            fill(255);
            ellipse(clouds[i].x_pos - 100, clouds[i].y_pos - 250, clouds[i].size);
            ellipse(clouds[i].x_pos - 60, clouds[i].y_pos - 250, clouds[i].size);
            ellipse(clouds[i].x_pos - 130, clouds[i].y_pos - 250, clouds[i].size, clouds[i].size - 20);
            ellipse(clouds[i].x_pos - 30, clouds[i].y_pos - 250, clouds[i].size, clouds[i].size - 20);
        }
    pop();
}

// Function to draw mountains objects.
function drawMountains()
{
    push();
    translate(scrollPos, 0);
    for(var i = 0; i < mountains.length; i++)
        {
            noStroke();
            fill(160, 160, 160);
            triangle(mountains[i].x_pos + 100, mountains[i].y_pos, 
                     mountains[i].x_pos + 300, mountains[i].y_pos,
                     mountains[i].x_pos + 300, mountains[i].y_pos - 300);

            fill(128, 128, 128);
            triangle(mountains[i].x_pos + 300, mountains[i].y_pos,
                     mountains[i].x_pos + 450, mountains[i].y_pos,
                     mountains[i].x_pos + 300, mountains[i].y_pos - 300);
            fill(255);
            triangle(mountains[i].x_pos + 300, mountains[i].y_pos - 182,
                     mountains[i].x_pos + 228, mountains[i].y_pos - 192,
                     mountains[i].x_pos + 300, mountains[i].y_pos - 300);
            fill(224, 224, 224);
            triangle(mountains[i].x_pos + 300, mountains[i].y_pos - 182,
                     mountains[i].x_pos + 354, mountains[i].y_pos - 192,
                     mountains[i].x_pos + 300, mountains[i].y_pos - 300);
            fill(160, 160, 160);
            triangle(mountains[i].x_pos + 75, mountains[i].y_pos, 
                     mountains[i].x_pos + 175, mountains[i].y_pos,
                     mountains[i].x_pos + 175, mountains[i].y_pos - 200);
            fill(128, 128, 128);
            triangle(mountains[i].x_pos + 175, mountains[i].y_pos,
                     mountains[i].x_pos + 275, mountains[i].y_pos,
                     mountains[i].x_pos + 175, mountains[i].y_pos - 200);
            fill(160, 160, 160);
            triangle(mountains[i].x_pos + 325, mountains[i].y_pos,
                     mountains[i].x_pos + 405, mountains[i].y_pos,
                     mountains[i].x_pos + 405, mountains[i].y_pos - 150);
            fill(128, 128, 128);
            triangle(mountains[i].x_pos + 405, mountains[i].y_pos,
                     mountains[i].x_pos + 505, mountains[i].y_pos,
                     mountains[i].x_pos + 405, mountains[i].y_pos - 150);
        }
    pop();
}

// Function to draw trees objects.
function drawTrees()
{
    push();
    translate(scrollPos, 0);
    for(var i = 0; i < trees_x.length; i++)
        {
            //tree trunk
            fill(153, 76, 0);
            rect(trees_x[i], floorPos_y * 3/4, 50, 144);
            fill(102, 51, 0);
            rect(trees_x[i], floorPos_y * 3/4, 18, 144);
            triangle(trees_x[i], floorPos_y * 3/4 + 144,
                     trees_x[i], floorPos_y * 3/4 + 94,
                     trees_x[i] - 67, floorPos_y * 3/4 + 144);
            //tree leaves
            fill(0, 102, 0);
            ellipse(trees_x[i] + 25, floorPos_y * 3/4 - 40, 150, 150);
            ellipse(trees_x[i] - 43, floorPos_y * 3/4 - 40, 100, 100);		
            ellipse(trees_x[i] + 93, floorPos_y * 3/4 - 40, 100, 100);
        }
    pop();
}


// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
    push();
    translate(scrollPos, 0);
    noStroke();
    fill(100, 155, 255);
    rect(t_canyon.x_pos, 432, t_canyon.width, 144);
    fill(91, 46, 0);
    triangle(t_canyon.x_pos, 432, 
             t_canyon.x_pos, 576, 
             t_canyon.x_pos - 50, 576);
    triangle(t_canyon.x_pos - 40 + 80, 432, 
             t_canyon.x_pos + 40, 576, 
             t_canyon.x_pos + 90, 576); 
    pop();
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
    
    //console.log(t_canyon.x_pos, gameChar_world_x);
    if(gameChar_y < floorPos_y)
        {
            gameChar_y += 2.5;
            isFalling = true;
        }
    else
        {
            isFalling = false;
        }
    
    if(t_canyon.x_pos < gameChar_world_x && gameChar_world_x < t_canyon.x_pos + t_canyon.width && gameChar_y >= floorPos_y)
        {
            isPlummeting = true;
        }
    if(isPlummeting == true)
        {
            gameChar_y += 25;
        }
}

function renderFlagpole()
{
    push();
    translate(scrollPos, 0);
    strokeWeight(5);
    stroke(100);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
    noStroke();
    
    if(flagpole.isReached)
        {
            fill(255, 0, 255);
            rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
        }
    else
        {
            fill(255, 0, 255);
            rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
        } 

    pop();
}

function checkFlagpole()
{
    var d = abs(gameChar_world_x - flagpole.x_pos);
    
     //console.log(d);
    
    if(d < 15)
        {
            flagpole.isReached = true;
        }
}

function checkPLayerDie()
{

    console.log(lives);
    if(isPlummeting && lives > 0)
        {
            lives -= 1;
            startGame();
        } 
}

function startGame()
{
    gameChar_x = width/2;
	gameChar_y = floorPos_y;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

	// Initialise arrays of scenery objects
    trees_x = [600, 1000, 1500, 2300];
    clouds = [
        {x_pos: 180, y_pos: 320, size: 60},
        {x_pos: 680, y_pos: 220, size: 60},      
        {x_pos: 880, y_pos: 320, size: 60},
        {x_pos: 1280, y_pos: 320, size: 60},
        {x_pos: 1880, y_pos: 320, size: 100},
        {x_pos: 2880, y_pos: 320, size: 80}
    ];
    mountains = [
        {x_pos: 50, y_pos: 432, size: 50},
        {x_pos: 1100, y_pos: 432, size: 40},
        {x_pos: 2300, y_pos: 432, size: 50},
    ];
    collectables = [
        {x_pos: 20, y_pos: floorPos_y, size: 100, isFound: false},
        {x_pos: 320, y_pos: floorPos_y, size: 100, isFound: false},
        //{x_pos: 620, y_pos: floorPos_y, size: 100, isFound: false},
        {x_pos: 920, y_pos: floorPos_y, size: 100, isFound: false}
    ];
    canyon = [
        {x_pos: 80, width: 40},
        {x_pos: 1880, width: 40}
    ];

    
    game_score = 0;
    
    flagpole = {isReached: false, x_pos: 3100};
    
}


// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{
    push();
    translate(scrollPos, 0);
    noStroke();
    fill(93, 186, 0);
    ellipse(t_collectable.x_pos, t_collectable.y_pos, t_collectable.size - 60, t_collectable.size); 
    fill(102, 51, 0);
    rect(t_collectable.x_pos - 20, t_collectable.y_pos + 30, 40, 50);

    stroke(102, 51, 0) ;
    strokeWeight(2);
    line(t_collectable.x_pos - 25, t_collectable.y_pos - 40, t_collectable.x_pos - 10, t_collectable.y_pos - 30);
    line(t_collectable.x_pos + 25, t_collectable.y_pos - 40, t_collectable.x_pos + 10, t_collectable.y_pos - 30);
    line(t_collectable.x_pos, t_collectable.y_pos - 45, t_collectable.x_pos, t_collectable.y_pos - 75);
    line(t_collectable.x_pos + 25, t_collectable.y_pos - 10, t_collectable.x_pos + 10, t_collectable.y_pos);
    line(t_collectable.x_pos - 25, t_collectable.y_pos - 10, t_collectable.x_pos - 10, t_collectable.y_pos);
    line(t_collectable.x_pos - 25, t_collectable.y_pos + 20, t_collectable.x_pos - 10, t_collectable.y_pos + 30);
    line(t_collectable.x_pos + 35, t_collectable.y_pos + 20, t_collectable.x_pos + 10, t_collectable.y_pos + 30);
    
    pop();
    

}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
    if(dist(gameChar_world_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 20)
        {
            t_collectable.isFound = true;
            game_score += 1;
        }
    
    
}
