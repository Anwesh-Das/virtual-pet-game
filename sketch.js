var dog,sadDog,happyDog;
var foodObj;
var foods;
var database;
var lastFed;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill(255,255,254);
    textSize(15);
    if(lastFed >= 12){
      text("Last Feed : " + lastFed % 12 + " PM",350,30);
    }else if(lastFed == 0){
      text("Last Feed : 12 AM",350,30);
    }else{
      text("Last Feed : " + lastFed + " AM",350,30);
    }
  
  drawSprites();
}

function feedDog(){
  dog.addImage(happyDog);
  
  if(foodObj.getFoodStock() <= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
}

function addFoods(){
  foods ++;
  database.ref('/').update({
    Food : foods
  });
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food : foodObj.getFoodStock(),
    FeedTime : hour()
  });
}