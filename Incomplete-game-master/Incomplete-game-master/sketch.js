


// MAM THE ASTRONAUT DOES NOT MOVE WHEN I PRESS THE RIGHT AND LEFT or the UP & DOWN ARROW KEYS IN STAGE 4, THE MOON STAGE..PLEASE HAVE A LOOK
// ALSO PLEASE tell how ADD A TIMER, FOR LIKE WHEN OXYGEN RUNS OUT AND THE CAMERA IS ALSO NOT WORKING IN STAGE 4.


var bgimg,astroimg,rockimg,rockflyimg,astronaut,rocket,asteroid,astrofly,astroflyimg,astgroup;
var satelite,satgroup,bull,bulletgrp,flag,ice,dome,domeimg;
var gameState = "Stage1";
var score = 0;
var bullets = 16;
let img;
let positions=[];

function preload(){
  bgimg = loadImage("background.jpg");
  astroimg = loadImage("astronaut.png");
  rockimg = loadImage("rocket.static.png");
  rockflyimg = loadImage("rocket.flying.png");
  ast1 = loadImage("asteroid1.png");
  ast2 = loadImage("asteroid2.png");
  ast3 = loadImage("asteroid3.png");
  earth = loadImage("earth.png");
  astroflyimg = loadImage("astro.sit.png");
  sat1 = loadImage("sat1.png");
  sat2 = loadImage("sat2.png");
  sat3 = loadImage("sat3.png");
  bulletimg = loadImage("bull.png");
  flagimg = loadImage("flag.png");
  iceimg = loadImage("ice.png");
  domeimg = loadImage("dome.png");

// image texture from http://planetpixelemporium.com/
  img = loadImage('earth.png');
}

function setup() {
  createCanvas(1200,600);

  astronaut = createSprite(50,500,50,50);
  astronaut.addImage(astroimg);
  astronaut.scale = 0.15;

  rocket = createSprite(600,400,50,50);
  rocket.addImage("standing",rockimg);
  rocket.addImage("flying",rockflyimg);
  rocket.setCollider("rectangle",0,0,50,100);
  rocket.scale = 2;

  astrofly = createSprite(10,300,50,50);
  astrofly.addImage(astroflyimg);
  astrofly.scale = 0.2;
  astrofly.velocityX = 1;
  astrofly.setCollider("rectangle",10,10,10,10);
  astrofly.visible = false;
  
  flag = createSprite(1610,90,20,20);
  flag.addImage("flagimg",flagimg);
  flag.scale = 0.3;
  flag.visible = false;

  ice = createSprite(1500,250,20,20);
  ice.addImage("iceimg",iceimg);
  ice.scale = 1;
  ice.visible = false;

  dome = createSprite(720,115,30,30);
  dome.addImage("domeimg",domeimg);
  dome.scale = 0.65;
  dome.visible = false;
  
  astgroup = createGroup();
  satgroup = createGroup();
  bulletgrp = createGroup();

  for (let i=0; i<100; i++){
    positions.push([random(-250,230), random(-250,230),random(-8,12) ])
  }
}

function draw() {
  background(bgimg);
  fill(0,255,255);
  stroke(0);
  textSize(22);
  text("SCORE: "+score,10,25);
  // STAGE 1
  if(gameState==="Stage1"){
    fill(255,200,0);
    textSize(21);
    text("The Rocket's about to leave !! Press the Right Arrow to take off !!",340,20);

    if(keyDown(RIGHT_ARROW)){
      astronaut.x += 10;
     
    }
    if(astronaut.isTouching(rocket)){
      rocket.changeImage("flying",rockflyimg);
      astronaut.visible = false;
      rocket.velocityY = -7;
    }
    if(rocket.y<0){
      text("You're about to face a massive Asteroid Attack ! Watch Out !",360,65);
      rocket.destroy();
      bgimg = loadImage("space.jpg");
      score +=50;
      gameState ="Stage2";
     
    }
  }
  // STAGE 2 
  if(gameState==="Stage2"){
    astrofly.visible = true;
    image(img,50,height/2,200,200);
    fill(255,0,0);
    spawnAsteroids();
    textSize(20);
    text("Use UP & DOWN ARROW keys to find your way out, AVOID the ASTEROIDS",astrofly.x-350,22);
     

    if(keyDown(UP_ARROW)){
      astrofly.y = astrofly.y-10;
    }
    if(keyDown(DOWN_ARROW)){
      astrofly.y = astrofly.y+10;
    } 
    if(astrofly.y<0 || astrofly.y>600){
      text("Stay in the Zone",width/2,height/2);
    }
    
    if(astrofly.isTouching(astgroup)){
      score = score-20;
      textSize(30);
      text("OUCH !",astrofly.x-250,astrofly.y);
    }
    else{score = score+10}
     
    if(score>=800){
      gameState="Stage3";
    }

    // STAGE OVER
 if(World.seconds>300){
    if(score<50){
      gameState = "over";
    }
  }
}
  // STAGE 3
  if(gameState==="Stage3"){
    astgroup.destroyEach();
    bgimg = loadImage("space2.jpg");

    astrofly.velocityX = 0;
    astrofly.y = mouseY;

    fill(255,0,0);
    textSize(20);
    text("MISSION: Kill the Neighbouring Country's Spying Satellites by pressing SPACE & Moving Cursor.",astrofly.x-400,22);
    spawnSat();
    
    if(keyWentDown("SPACE")){
      bullet();
    }
    for (var l = 0; l < satgroup.length; l++) {
      mysprite =  satgroup.get(l);
      if(mysprite.isTouching(bulletgrp)){
        for (var n = 0; n < bulletgrp.length; n++) {
          mybull =  bulletgrp.get(n);
          mysprite.destroy();
          mybull.destroy();
          score+=50;
        }
       }
     } 
   
    if(astrofly.isTouching(satgroup)){
      score = score-20;
    }
    else{
      score=score+1
    };
    if(score >1500){
      gameState ="Stage4";
    }
    if(World.seconds>700){
      if(score<750){
        gameState = "over";
      }
          
    }
  }
  if(gameState=="over"){
    bgimg=loadImage("gameover.jpg")
  }
    // STAGE 4  
    if(gameState==="Stage4"){
      satgroup.destroyEach();
      bulletgrp.destroyEach();

      bgimg = loadImage("moongrd.jpg");

      astrofly.visible = false;

      astronaut.visible = true;
      flag.visible = true;
      ice.visible = true;
      dome.visible = true;
      
      if(keyDown(UP_ARROW)){
        astronaut.y = astronaut.y-10;
      }
      if(keyDown(DOWN_ARROW)){
        astronaut.y = astronaut.y+10;
      }

     
    }
    console.log(astronaut.y)
    console.log(astronaut.x)
  drawSprites(); 
}

function spawnAsteroids(){
  if(frameCount%7===0){
    var asteroid = createSprite(random(camera.position.x*2.5,camera.position.x*4),random(-10,700),20,20);
    asteroid.velocityX = random(-2,-5);
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1:
        asteroid.addImage("asteroid1",ast1);
        break;
      case 2:
      asteroid.addImage("asteroid2",ast2);
        break;
      case 3:
      asteroid.addImage("asteroid3",ast3);
        break;
      default:
        break;
      }
    astgroup.add(asteroid);
    asteroid.scale = 0.2;
    asteroid.lifetime = 1000;
    }
  }

  function spawnSat(){
    if(frameCount%50===0){
      var satelite = createSprite(random(1500, 1800),random(0,610),20,20);
      satelite.velocityX = random(-1,-5);
      var rand = Math.round(random(1,3));
      switch(rand){
        case 1:
          satelite.addImage("sat1",sat1);
          break;
        case 2:
          satelite.addImage("sat2",sat2);
          break;
        case 3:
        satelite.addImage("sat3",sat3);
          break;
        default:
          break;
      }
      satgroup.add(satelite);
      satelite.scale = 0.4;
      satelite.lifetime = 1000;
    }
  }

  function bullet(){
    bull = createSprite(astrofly.x,astrofly.y,20,10);
    bull.addImage("bulletimg",bulletimg);
    bull.scale = 0.15;
    bull.velocityX = 10;
    bulletgrp.add(bull);
  }