var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var lastFed;
var foodObj;
var feed,addFood;

function preload(){
   dogImg=loadImage("Images/Dog.png");
   happyDog=loadImage("Images/happy dog.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(displayWidth,displayHeight);

  dog=createSprite(760,220,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);


  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);



 
 
  textSize(20); 

  foodObj=new Food(foodStock,lastFed);
}

// function to display UI
function draw() {
  background(46,139,87);

  
  // if(keyWentDown(UP_ARROW)){
  //   writeStock(foodS);
  //   dog.addImage(dogImg1);
  // }
 
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });



  fill(255,255,254);
  textSize(15);
  stroke("black");

  if(lastFed>=12){
    text("Last Feed : "+lastFed%12 + "PM", 350,30)
  }
  else if(lastFed==0){
    text("Last Feed : 12 AM", 350,30)
  }
  else{
    text("Last Feed : " + lastFed + "AM", 350,30)
  }
  
  // text("Food remaining : "+foodS,170,200);
  
  // text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10);

  foodObj.display();
  
  drawSprites();
}

//Function to read values from DB
function readStock(data){
 // console.log(data);
  foodS=data.val();
  console.log(foodS);
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x,
    
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })

}