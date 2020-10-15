//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dog1, dog2;
var bg;

function preload()
{
  //load images here
  dog1 = loadImage("dogImg.png");
  dog2 = loadImage("dogImg1.png");
  dog3 = loadImage("dogBowl.png");
  bg = loadImage("Background.png");


}

function setup() {
  database = firebase.database();

	createCanvas(500, 500);
  dog = createSprite(width*(3/4), height-125, 50, 50);
  dog.addImage(dog1);
  dog.scale = 0.25;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);
  image(dog3, width/4, dog.y);
  if(keyDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dog2);
  }
  drawSprites();
  //add styles here
  textSize(15);
  fill(255);
  noStroke()
  text("Food left:" + foodS, width/4, dog.y);
  text("Press UP arrow to give doggy food!", width/3, 50);
}

function readStock(data){
  foodS = data.val
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x=x-1;
  }
  database.ref('Food').update({
    Food:x
  })
}



