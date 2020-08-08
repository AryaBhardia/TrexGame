  var trex_running;
  var trex;
  var ground, ground_moving;
  var invisible_ground;
  var cloudImage;
  var Obstacle_1;
  var Obstacle_2;
  var Obstacle_3;
  var Obstacle_4;
  var Obstacle_5;
  var Obstacle_6;
  var PLAY,END,gameState;
  var ObstaclesGroup;
  var CloudsGroup;
  var trex_collided;
  var restart;
  var gameOver;
  var restartImage, gameOverImage;
  var count 

  function preload()  {
  trex_running = loadAnimation ("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage ("trex_collided.png");
  ground_moving = loadImage ("ground2.png");
  cloudImage = loadImage ("cloud.png");
  Obstacle_1 = loadImage ("obstacle1.png");
  Obstacle_2 = loadImage ("obstacle2.png");
  Obstacle_3 = loadImage ("obstacle3.png");
  Obstacle_4 = loadImage ("obstacle4.png");
  Obstacle_5 = loadImage ("obstacle5.png");
  Obstacle_6 = loadImage ("obstacle6.png");
  restartImage = loadImage ("restart.png");
  gameOverImage = loadImage ("gameOver.png");
  
  }
function setup() {
  createCanvas(800, 200);
  
  trex = createSprite(200,165,20,20);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale=0.5;
  
  ground = createSprite(200,180,20,20);
  ground.addImage("moving",ground_moving);
  ground.velocityX=-4
  
  invisible_ground = createSprite(400,195,800,20);
  invisible_ground.visible = false;
  
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  
  ObstaclesGroup = new Group();
  CloudsGroup = new Group();
  
  restart = createSprite(400,80,400,200);
  restart.addAnimation("restart",restartImage);
  restart.visible=false;
  restart.scale = 0.5;
  gameOver = createSprite(400,40,200,200);
  gameOver.addAnimation("gameOver",gameOverImage);
  gameOver.visible=false;
  gameOver.scale = 0.5;
  
  
  count = 0;
}

  
function draw() {

  background(255);
  
  drawSprites();
  
  trex.collide(invisible_ground);
  
  text("Score: "+ count, 500, 50);
  
  if (gameState===PLAY)  {
    
  if(ground.x<0)  {
  ground.x=ground.width/2  
  }
  ground.velocityX=-4;
    
  if(keyDown("space")&&trex.y>160)  {
  trex.velocityY = -8; 
  }
  trex.velocityY=trex.velocityY+0.5;
  
  spawnClouds();
  spawnObstacles();
  
  if (frameCount % 4 === 0) {
  count=count+1;  
    }
  if(ObstaclesGroup.isTouching(trex)){
  gameState = END;
  }
}

else if(gameState === END) {
    ground.velocityX = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    trex.velocityY = 0;
    trex.changeAnimation("collided");
    restart.visible=true;
    gameOver.visible=true;
    
    
    
    if (mousePressedOver(restart)) {
    restartGame  ();  
    
    }
    
    
  }
}


function restartGame() { 
  //write code here to restart the game
  gameState = PLAY;
  ObstaclesGroup.destroyEach();
   CloudsGroup.destroyEach();
   restart.visible=false;
    gameOver.visible=false;
    trex.changeAnimation("running");
    count = 0;
   
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(800,165,10,40);
    obstacle.velocityX = -4.8;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
    //switch statement to add animation for the obstacle
    switch(rand){
      case 1:obstacle.addImage("obstacle",Obstacle_1); break;
      case 2:obstacle.addImage("obstacle",Obstacle_2); break;
      case 3:obstacle.addImage("obstacle",Obstacle_3); break;
      case 4:obstacle.addImage("obstacle",Obstacle_4); break;
      case 5:obstacle.addImage("obstacle",Obstacle_5); break;
      case 6:obstacle.addImage("obstacle",Obstacle_6); break;
      
      
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 170;
    
    ObstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(800,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage("cloud",cloudImage);
    cloud.scale = 0.8;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 267;
    
   CloudsGroup.add(cloud)
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}