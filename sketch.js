var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bg,bgImg;
var kid,kidimg;
var gameOverImg,gameOver;
var healthyfood,junkfood;
var apple,banana,beetroot,broccoli,burger,cupcake,fries;
var junkfoodGroup,healthyfoodGroup;
var score=0;

function preload()
{
  //load all images as per the image name and variable created for loading it.
  bgImg = loadImage("assets/bgimg.png");
  kidimg = loadImage("assets/kid.png");
  gameOverImg = loadImage("assets/gameOver.png");
  
}

function setup() 
{
  createCanvas(1200,800);
  bg=createSprite(0,0,800,800);
  bg.addImage(bgImg);
  bg.scale=8;

  kid=createSprite(50,400,40,40);
  kid.addImage(kidimg);
  kid.scale=0.3;
  junkfoodGroup = createGroup();
  healthyfoodGroup = createGroup();
}

function draw() 
{
  background(255,255,255); 
  
  drawSprites(); 
  fill("white")
  textSize(40)
  text("Score: "+ score, 500,50);
  if(gameState === PLAY)
  {
    
    if(keyDown(UP_ARROW))
    {
      kid.y=kid.y-5
    }
    if(keyDown(DOWN_ARROW))
    {
      kid.y=kid.y+5
    }
    
    if(healthyfoodGroup.isTouching(kid))
    {
      for(var i=0;i<healthyfoodGroup.length;i++){     
          
       if(healthyfoodGroup[i].isTouching(kid))
       {
            healthyfoodGroup[i].destroy()
            score = score+2
       } 
     }
    }
    
    if(junkfoodGroup.isTouching(kid))
    {
      gameState = END;  
    }
    //Call function to spawnhealthyfood
    spawnhealthyfood();
    //Call function to spawnjunkfood
    spwanjunkfood();
  }
  else if (gameState === END) 
  {
    fill("yellow");
    textSize(50);
    text("Game Over",400,400);
  
    junkfoodGroup.setLifetimeEach(-1);
    healthyfoodGroup.setLifetimeEach(-1);
     
    junkfoodGroup.setVelocityXEach(0);
    healthyfoodGroup.setVelocityXEach(0);
 }
 
   
}

function spwanjunkfood()
{
  if (frameCount % 60 === 0){
    var junkfood = createSprite(1100,400,10,40);
    junkfood.y=Math.round(random(100,800));
    //Give velocity to junkfood
      junkfood.velocityX = -(6 + 3*score/100);
    
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: junkfood.addImage(cupcake);
               break;
       case 2: junkfood.addImage(fries);
               break;
       case 3: junkfood.addImage(burger);
               break;
       default: break;
     }
    
               
     junkfood.scale = 0.2;
     //assign lifetime to the junkfood
     junkfood.lifetime = 200;
    
    //add each junkfood to the junkfoodGroup
     junkfoodGroup.add(junkfood)
  }
 }
 function spawnhealthyfood()
 {
  if (frameCount % 60 === 0)
  {
    var healthyfood = createSprite(1100,400,10,40);
    healthyfood.y=Math.round(random(100,800));
     //Give velocity to healthyfood
     healthyfood.velocityX = -(6 + 4*score/100);
    
     var rand = Math.round(random(1,4));
     switch(rand) {
       case 1: healthyfood.addImage(apple);
               break;
       case 2: healthyfood.addImage(banana);
               break;
       case 3: healthyfood.addImage(beetroot);
               break;
       case 4: healthyfood.addImage(broccoli);
               break;
       
       default: break;
     }
             
     healthyfood.scale = 0.2;
    //assign lifetime to the healthy
     healthyfood.lifetime = 300;
    //add each healthyfood to the healthyfoodGroup
    healthyfoodGroup.add(healthyfood)
  }
 }

