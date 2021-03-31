//DEFINING THE FRUIT VARIABLES.
var fruit, fruit1,fruit2,fruit3,fruit4;

//DEFINING ENEMY VARIABLES
var enemy,enemy1;

//DEFINING RANDOM VARIAABLES
var random_fruit, random_enemy, random_funx, position_fruit;

//DEFINING KNIFE VARIABLES
var knife, knifeimg;

//DEFINING GAMEOVER VARIABLES
var gameOver, gameOverimg;

//DEFINING SCORE VARIABLE
var score;

//DEFINING THE GROUP VARIABLES
var fruitGroup, enemyGroup, knifeGroup;

//DEFINING GAMESTATE VARIABLES
var gameState="play";

//DEFINING SOUND VARIABLES
var knifeSound, gameOverSound;

function preload(){
  
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  enemy1=loadAnimation("alien1.png","alien2.png");
  knifeimg=loadImage("sword.png");
  gameOverimg=loadImage("gameover.png");
  knifeSound=loadSound("knifeSwooshSound.mp3");
  gameOverSound=loadSound("gameover.mp3");
 
}
function setup(){
  
  createCanvas(500,500);
  
  knife=createSprite(50,250,20,20);
  knife.addImage(knifeimg);
  knife.scale=0.7;
  
  gameOver=createSprite(250,250,20,20);
  gameOver.addImage(gameOverimg);
  gameOver.scale=0.7;
  gameOver.visible=false;
  
  score=0;
  
  fruitGroup= new Group();
  enemyGroup= new Group();   
}

function draw(){
  
  background("white");
  
  random_funx=Math.round(random(1,2));
  if(gameState=="play"){
  
  knife.x=World.mouseX;
  knife.y=World.mouseY;
  
    if(random_funx==1){
      fruit_display();
    }
    
    if(random_funx==2){  
      enemy_display();
    }
  if(fruitGroup.isTouching(knife)){
    knifeSound.play();
    fruitGroup.destroyEach();
    score=score+2;
  }
    
    if(enemyGroup.isTouching(knife)){
      knifeSound.play();
      gameState="end";
      enemyGroup.destroyEach();
    }
  }
  else if(gameState=="end"){
    
    gameOverSound.play();
    gameOver.visible=true;
    knife.visible=false;
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
  }
  textSize(20);
  fill('red');
  text("Score:"+score,400,50);
  noFill();
  drawSprites();
  

}

function fruit_display(){
 
  random_fruit=Math.round(random(1,4));
  position=Math.round(random(1,2));
  //console.log(random_fruit);
 if(frameCount % 60==0){
   fruit=createSprite(Math.round(random(100,480)),0,20,20);
   fruit.velocityY=5;
   fruit.scale=0.2;
   fruit.lifetime=100;
   fruitGroup.add(fruit);
   
   switch(random_fruit){
     case 1: fruit.addImage(fruit1);
       break;
     case 2: fruit.addImage(fruit2);
       break;
     case 3: fruit.addImage(fruit3);
       break;
     case 4: fruit.addImage(fruit4);
       break;
    default:
       break;      
   }
   
   if(position==1){
     
     fruit.y=0;
     fruit.velocityY=(5+score/4);
   }
   else if(position==2){
     
     fruit.y=500;
     fruit.velocityY=-(5+score/4);
     
   }
 }
  
}

function enemy_display(){
  
  random_enemy=Math.round(random(1,2));
  if(frameCount%150==0)
    {
          enemy=createSprite(Math.round(random(100,480)),0,20,20);
    enemy.velocityY=5+score/10;
    enemy.scale=0.8;
    enemy.lifetime=250;  
    enemyGroup.add(enemy);
    enemy.addAnimation("enemy",enemy1);
     
    }
}
