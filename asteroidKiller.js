///// intro canvas /////

var introCanvas = document.getElementById("intro-canvas");
var newContext = introCanvas.getContext("2d");
var score = 0;
var asteroids = [];
var firstAnimationFrames = this.frameNo = 0;

var button = {
	topLeftX : 345,
	topLeftY : 400,
	topRightX : 455,
	topRightY : 400,
	bottomLeftX : 345,
	bottomLeftY : 425,
	bottomRightX : 455,
	bottomRightY : 425
}

var buttonText = {
	x : button.topLeftX + 5 , 
	y : button.topLeftY + 19
}

function Asteroid (x , y , radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.create = function () {
		newContext.beginPath();
		newContext.fillStyle = "yellow";
		newContext.strokeStyle = "brown";
		newContext.arc(this.x , this.y , radius , 0 , 2 * Math.PI);
		newContext.stroke();
		newContext.fill();
	this.update = function () {
		this.x += 1;
		this.y += 2;
	}
	}
}

function clearIntro () {
	newContext.clearRect(0,0,introCanvas.width , introCanvas.height);
}
function createButton (ctx , topLeftX , topLeftY, topRightX , topRightY ,
 bottomRightX , bottomRightY , bottomLeftX , bottomLeftY) {
	ctx.beginPath();
	ctx.strokeStyle = "pink";
	ctx.moveTo(topLeftX , topLeftY);
	ctx.lineTo(topRightX , topRightY);
	ctx.lineTo(bottomRightX , bottomRightY);
	ctx.lineTo(bottomLeftX , bottomLeftY);
	ctx.lineTo(topLeftX , topLeftY);
	ctx.stroke();
}

function createText (ctx) {
	ctx.beginPath();
	ctx.font = "30px arial";
	ctx.fillStyle = "orange";
	ctx.fillText("Asteroid Killer" , 325 , 40);
	ctx.closePath();
	ctx.beginPath();
	ctx.font = "30px arial";
	ctx.fillStyle = "white";
	ctx.fillText("The goal of this game is to shoot down as many asteroids", 210 , 80, 400);
	ctx.fillText("as possible.There are 5 levels with each level increasing", 210 , 120, 400);
	ctx.fillText("the asteroids speed toward the player. To shoot down an", 210 , 160, 400);
	ctx.fillText(" asteroid, line up your shot with the asteroid and press the", 210 , 200, 400);
	ctx.fillText("spacebar. You can also manuver your ship by pressing or holding", 210 , 240, 400);
	ctx.fillText(" down the arrow buttons < > on your keyboard. Don't worry about", 210 , 280, 400);
	ctx.fillText(" asteroids hitting your ship or passing by you because the", 210 , 320 ,400);
	ctx.fillText(" point of this game is to get the highest score you can.", 210 , 360, 400);
}

function createButtonText (ctx , x , y) {
	this.x = x;
	this.y = y;
	ctx.beginPath();
	ctx.font = "20px arial";
	ctx.fillStyle = "orange";
	ctx.fillText("New Game" , this.x , this.y);
}


function introFrame () {
	score = 0;
	var asteroid = {
	x : Math.floor(Math.random() * 700 + 1),
	y : -20
}
	firstAnimationFrames += 1;
	clearIntro();
	createText(newContext);
	createButtonText(newContext , buttonText.x , buttonText.y);
	createButton( newContext, button.topLeftX, button.topLeftY, button.topRightX, button.topRightY,
 button.bottomRightX, button.bottomRightY,button.bottomLeftX,button.bottomLeftY);
 
	if (firstAnimationFrames % 200 == 0) {
		asteroids.push(new Asteroid(asteroid.x , asteroid.y , 6))
	}
	
	if (asteroids.length >= 30) {asteroids = []}
	
	for (y = 0; y < asteroids.length; y++) {
		asteroids[y].create();
		asteroids[y].update();
	}
if (secondAnimationFrames == 0) {	
window.requestAnimationFrame(introFrame);
}
}


introCanvas.addEventListener("click", function (event) {
	cx = event.pageX;
	cy = event.pageY;
	if (cx >= 0 && cx <= introCanvas.width) {
	if (cy >= 0 && cy <= introCanvas.height) {
		introCanvas.style.display = "none";
		document.getElementById("finalScore").style.display = "none";
		asteroids = [];
		firstAnimationFrames = 0;
		frame();
	}
	}
	
} , false);
 
///// game canvas /////
var canvas = document.getElementById("game-canvas");
var context = canvas.getContext("2d");

var shoot = new Audio();
shoot.src="Shoot.m4a";
var hit = new Audio();
hit.src = "Hit.m4a";


var ship = {
shipTopX : 275,
shipTopY : 480,
shipRightX : 305,
shipRightY : 510,
shipBottomX : 275,
shipBottomY : 550,
shipLeftX : 245,
shipLeftY : 510,
}
 
var blocks = [];
var missiles = [];
var secondAnimationFrames = this.frameNo = 0;
var missile;
var level = 1;


var projectile = {
	x : ship.shipTopX - 2.5,
	y : ship.shipTopY + 10,
	width : 5,
	height : 15	
}

function frame () {
document.getElementById("game-container").style.display = "block";
document.getElementById("level").innerHTML = "Level " +  level;
document.getElementById("score").innerHTML = "Score : " + score;
clear();
var block  = { x : Math.floor(Math.random() * 300 + 100), y : 30, width : 30, height : 30} 

secondAnimationFrames += 1;
if (secondAnimationFrames % 30 == 0 && secondAnimationFrames <=  10000) { blocks.push( new Block(block.x , block.y , block.width , block.height))}
if (secondAnimationFrames == 2001) {level = 2; blocks = [];}
else if (secondAnimationFrames == 4001) {level = 3; blocks = [];}
else if (secondAnimationFrames == 6001) {level = 4; blocks = [];}
else if (secondAnimationFrames == 8001) {level = 5; blocks = [];}
else if (secondAnimationFrames >= 10000) {level = 1; blocks = [];}

for (i = 0; i < blocks.length; i++) {
	blocks[i].update();
	if (projectile.x > blocks[i].x - 15 && projectile.x < blocks[i].x + 15 && 
	projectile.y > blocks[i].y - 15 && projectile.y < blocks[i].y + 15) {
			score += 100;
			blocks[i].updateColor();
		blocks[i].currentSpeed();
	}	
	else {blocks[i].currentSpeed();}
	
}
player = new DrawShip(ship.shipTopX,ship.shipTopY,ship.shipRightX,ship.shipRightY,ship.shipBottomX,ship.shipBottomY,ship.shipLeftX,ship.shipLeftY,);  
 missile = new createMissle(projectile.x , projectile.y , projectile.width , projectile.height); 
 if(secondAnimationFrames <= 10000) {window.requestAnimationFrame(frame)}
 else if (secondAnimationFrames >= 10000) {
	 secondAnimationFrames = 0;
	 document.getElementById("game-container").style.display = "none";
	 introCanvas.style.display = "block";
	document.getElementById("finalScore").style.display = "block";
	document.getElementById("finalScore").innerHTML = "Your Score : " + score;
	introFrame();
 }
}	

document.body.onkeyup = function(e) {
	if(e.keyCode == 32) 
		{ shoot.play();
	var handleInterval = setInterval( function () {
			projectile.y += -10;
				if (projectile.y <= 0)
			{ clearInterval(handleInterval);
					projectile.y = ship.shipTopY + 10;}
					} , 10) 
						}
							}
							

							
function moveLeft () {
	ship.shipTopX += -6;
	ship.shipBottomX += -6;
	ship.shipLeftX += -6;
	ship.shipRightX += -6;
	projectile.x += -6;
	if (projectile.x - 27 <= 0) {projectile.x += 6}
	
	if (ship.shipLeftX <= 0) {
		ship.shipLeftX += 6
		ship.shipRightX += 6
		ship.shipBottomX += 6
		ship.shipTopX += 6
		}
	
}
function moveRight () {
	ship.shipTopX += 6;
	ship.shipBottomX += 6;
	ship.shipLeftX += 6;
	ship.shipRightX += 6;
	projectile.x += 6;
	if (projectile.x + 32 >= canvas.width) {projectile.x += -6}
	
	if (ship.shipRightX >= canvas.width ) {
		ship.shipRightX += -6
		ship.shipLeftX += -6
		ship.shipBottomX += -6
		ship.shipTopX += -6
	}
}
function moveUp () {
	ship.shipTopY += -6;
	ship.shipBottomY += -6;
	ship.shipLeftY += -6;
	ship.shipRightY += -6;
	projectile.y += -6;
	if(projectile.y <= 15) {projectile.y += 6}
	
	if (ship.shipTopY <= 0) {
		ship.shipLeftY += 6
		ship.shipRightY += 6
		ship.shipBottomY += 6
		ship.shipTopY += 6
	}
}
function moveDown () {
	ship.shipTopY += 6;
	ship.shipBottomY += 6;
	ship.shipLeftY += 6;
	ship.shipRightY += 6;
	projectile.y += 6;
	if(projectile.y + 60 >= canvas.height) {projectile.y += -6}
	if (ship.shipBottomY >= canvas.height) {
		ship.shipLeftY+= -6
		ship.shipRightY += -6
		ship.shipBottomY += -6
		ship.shipTopY += -6}
}
	
function createMissle (x , y , width , height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	var color = "orange";
	context.beginPath();
	context.fillStyle = color;
	context.rect(x,y,width,height);
	context.fill();
	context.closePath();
	context.save();
}

function Block (x , y , width , height) {
	var color = "yellow";
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.update = function() {
    context.beginPath();
	context.strokeStyle = color;
	context.arc(this.x , this.y , 10 , 0 , 2 * Math.PI);
	context.stroke();
    }
	if (secondAnimationFrames <= 2000) {this.mainSpeed = 0.1; this.fullSpeed = 10;}
	else if (secondAnimationFrames > 2001 && secondAnimationFrames <= 4000) {this.mainSpeed = 0.2; this.fullSpeed = 3;}
	else if (secondAnimationFrames > 4001 && secondAnimationFrames <= 6000) {this.mainSpeed = 0.3; this.fullSpeed = 3;}
	else if (secondAnimationFrames > 6001 && secondAnimationFrames <= 8000) {this.mainSpeed = 0.4; this.fullSpeed = 3;}
	else if (secondAnimationFrames > 8001 && secondAnimationFrames <= 10000) {this.mainSpeed = 0.5; this.fullSpeed = 3;}

this.updateColor = function () {
		color = "red";
		hit.play();
	}
this.currentSpeed = function () {
	 if (color == "red") {
		 speed = this.y += this.fullSpeed;
		this.x += 10;
	 }
	 else if (color == "yellow") {speed = this.y += this.mainSpeed}
	}

	

}

const controller = {
		37 : {pressed : false, func : moveLeft},
		38 : {pressed : false, func : moveUp},
		39 : {pressed : false, func : moveRight},
		40 : {pressed : false, func : moveDown}
	}
	
document.addEventListener("keydown" , (e) => {
	if (controller[e.keyCode] && e.keyCode == 37) {
		controller[e.keyCode].pressed == true;
		moveLeft();
}
if (controller[e.keyCode] && e.keyCode == 38) {
		controller[e.keyCode].pressed == true;
		moveUp();
}
if (controller[e.keyCode] && e.keyCode == 39) {
		controller[e.keyCode].pressed == true;
		moveRight();
}
if (controller[e.keyCode] && e.keyCode == 40) {
		controller[e.keyCode].pressed == true;
		moveDown();
}

})

document.addEventListener("keyup", (e) => {
  if(controller[e.keyCode]){
    controller[e.keyCode].pressed = false;
  }
})




function DrawShip (shipTopX , shipTopY , shipRightX , shipRightY , shipBottomX , shipBottomY , shipLeftX , shipLeftY) {
	context.beginPath();
	context.strokeStyle = "red";
	context.lineWidth = "2";
	context.fillStyle = "rgb(50,10,10)";
	context.moveTo(shipRightX , shipRightY);
	context.quadraticCurveTo(shipBottomX , shipBottomY , shipLeftX , shipLeftY);
	context.lineTo(shipTopX , shipTopY);
	context.lineTo(shipRightX , shipRightY);
	context.stroke();
	context.fill();

	
}


function clear () {
	context.clearRect(0,0,canvas.width , canvas.height);
}

window.onLoad = introFrame();

