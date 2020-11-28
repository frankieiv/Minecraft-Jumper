var LavaBackgroundImg, LavaBackground;
var doorImg, door, doorsGroup;
var zombieImg, zombie,zombiesGroup;
var steve, steveImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  LavaBackgroundImg = loadImage("LavaBackground.jpeg");
  doorImg = loadImage("door.png");
  zombieImg = loadImage("Zombie.png");
  steveImg = loadImage("Steve.png");
}

function setup(){
  createCanvas(displayWidth, displayHeight-200);
  LavaBackground = createSprite(300,300);
  LavaBackground.addImage("LavaBackground",LavaBackgroundImg);
  LavaBackground.velocityY = 1;
  LavaBackground.scale = 2;
  doorsGroup = new Group();
  zombieGroup = new Group();
  invisibleBlockGroup = new Group();
  
  steve = createSprite(200,200,50,50);
  steve.scale = 0.1;
  steve.addImage("steve", steveImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      steve.x = steve.x - 3;
    }
    
    if(keyDown("right_arrow")){
      steve.x = steve.x + 3;
    }
    
    if(keyDown("space")){
      steve.velocityY = -10;
    }
    
    steve.velocityY = steve.velocityY + 0.8
    
    if(LavaBackground.y > 400){
      LavaBackground.y = 300
    }
    spawnDoors();

    
    //climbersGroup.collide(ghost);
    if(zombieGroup.isTouching(steve)){
      steve.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(steve) || steve.y > displayHeight){
      steve.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
  if(frameCount === 30000){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("YOU WIN NOW LEAVE LOL", 230,250)
  }
}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var zombie = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = zombie.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,800));
    zombie.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    zombie.addImage(zombieImg);
    
    door.velocityY = 1;
    zombie.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    steve.depth = door.depth;
    steve.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    zombie.lifetime = 800;
    zombie.scale=0.1
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    zombieGroup.add(zombie);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

