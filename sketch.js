
var bananaImage, FoodGroup;
var obstaclesImage, obstaclesGroup;
var scene, backImage, score, ground;
var cactusGroup;
var player, monkey;
var PLAY =1;
var END = 0;
var gameState = PLAY;
var cactusImage;

function preload() {

  backImage = loadImage("jungle.jpg");
  back = loadImage("go.png")
  player = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  obstaclesImage = loadImage("stone.png");
  bananaImage = loadImage("banana.png");
  cactusImage = loadImage("cactus.png");
}

function setup() {
  createCanvas(500, 400);

  scene = createSprite(200, 200, 40, 20);
  scene.addImage(backImage);
  scene.x = scene.width / 12;
  camera.position.y = displayHeight/4;
  camera.position.x =scene.width/4 ;

  monkey = createSprite(40, 295, 20, 20);
  monkey.addAnimation("Player", player);
  monkey.scale = 0.1;

  ground = createSprite(200, 320, 600, 5);
  ground.visible = false;

  obstaclesGroup = new Group();
  FoodGroup = new Group();
  cactusGroup = new Group();

  score = 0;
}

function draw() {
  background("black");
 scene.velocityX = -8
  if (scene.x < 0) {
    scene.x = scene.width / 2;
  }
  if (keyDown("space") && monkey.y >= 250) {
    monkey.velocityY = -17;
  }
 // console.log(monkey.y);
  monkey.velocityY = monkey.velocityY + 0.9;

  monkey.collide(ground);

  if (frameCount % 300 === 0) {
    var stone = createSprite(500, 290, 50, 20);
    stone.addImage(obstaclesImage);
    stone.scale = 0.3;
    stone.velocityX = -8;
    stone.lifetime = 64;
    obstaclesGroup.add(stone);
  }

  if (World.frameCount % 80 === 0) {
    var banana = createSprite(500, random(110, 190), 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.06;
    banana.velocityX = -8;
    banana.lifetime = 64;
    FoodGroup.add(banana);
  }

  if (World.frameCount % 100 === 0) {
    var cactus = createSprite(500, 295, 20, 20);
    cactus.addImage(cactusImage);
    cactus.scale = 0.2;
    cactus.velocityX = -8;
    cactus.lifetime = 64;
    cactusGroup.add(cactus);
 }

  if (obstaclesGroup.isTouching(monkey)) {
    obstaclesGroup.destroyEach();
    monkey.scale = 0.1;
    score = 0;
  }

  if (cactusGroup.isTouching(monkey)) {
   background(back);
    monkey.scale = 0;
    score = 0;
    cactus.velocityX = 0;
    text("GAMEOVER!!",200,200);
    textSize(50);
    fill("white");
    stroke(243,180,120)
    


  }
  if (FoodGroup.isTouching(monkey)) {
   FoodGroup.destroyEach();
    score = score + 2;
  }

 
  switch (score) {
    case 10:
      monkey.scale = 0.12;
      break;
    case 20:
      monkey.scale = 0.14;
      break;
    case 30:
      monkey.scale = 0.16;
      break;
    case 40:
      monkey.scale = 0.18;
      break;
    case 50:
      monkey.scale = 0.20;
      break;
    default:
      break;
  }
 
  
 

  drawSprites();
   
  stroke("white");
  textSize(22);
  fill("white");
  text("Score : " + score, 300, 80)
}