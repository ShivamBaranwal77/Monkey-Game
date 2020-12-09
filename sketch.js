//game states
var PLAY = 1;
var END = 0;
var gameState = 1;

//creating sprites
var ground;
var monkey, monkey_running;
var banana, bananaImage, bananaGroup;
var obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;


function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png");
  
  monkey_ = loadAnimation("sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

}



function setup() {

  //creating monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  monkey.debug = false;

  //creating ground
  ground = createSprite(400, 350, 900, 10);
  ground.x = ground.width / 2;

  //create banana & obstacle Group
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {

  background("white");

  banana();
  Obstacles();

  stroke("white");
  textSize(20);
  fill("white");
  text("score: " + score, 500, 50);

  //adding survival time
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate())
  text("survivalTime: " + survivalTime, 100, 50);


//making unlimited scrolling ground & adding velocity
  ground.velocityX = -4;
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }


  //ending game
  if (obstacleGroup.isTouching(monkey)) {
    gameState = END;
  }


  //jump when the space is pressed
  if (keyDown("space") && monkey.y >= 120) {
    monkey.velocityY = -12;
  }


//making monkey collide with ground & adding gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);

  
  if(gameState === PLAY){
  
  //Call banana and Obstacles functions
  banana();
  Obstacles();
  } 
  
  else if(gameState === END){       
    //Set velocity X for both the groups to 0
     bananaGroup.setVelocityXEach(0);
     obstacleGroup.setVelocityXEach(0);
    
     bananaGroup.setLifetimeEach(-1);
     obstacleGroup.setLifetimeEach(-1);
    
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
      
      ground.velocityX = 0;
      monkey.velocityY = 0;
    
    monkey.changeAnimation("mon",monkey_);
    
    
     }
    
  drawSprites();


}

function banana() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(400, 200, 20, 20);
    banana.scale = 0.1;
    banana.y = Math.round(random(120, 200));
    banana.addImage("bananaImg", bananaImage);
    banana.velocityX = -8;
    banana.setLifetime = 50;

    bananaGroup.add(banana);
  }
}

function Obstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600, 290, 10, 40);
    obstacle.velocityX = -4;
    obstacle.addImage("ob", obstaceImage);
    //assign scale and lifetime to the obstacle       
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}