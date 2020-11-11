const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, box2, box3, box4, box5, box6;
var backgroundImg,platform;
var bird, slingshot;
var gameState = "onSling";
var bgimg;

async function getBG(){
    var response=await fetch("https://worldtimeapi.org/api/timezone/America/Los_Angeles");
    var resJSON=await response.json();
    var dt=resJSON.datetime;
    var hr=dt.slice(11,13)
    console.log(hr);
    if (hr>=6 && hr<=18){
        bgimg="sprites/bg.png";
    }
    else{
        bgimg="sprites/bg2.jpg";
    }
    backgroundImg = loadImage(bgimg);
}

function preload() {
    getBG();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);

    box1 = new Box(400,360,30,30);
    box2 = new Box(430,360,30,30);
    box3 = new Box(460,360,30,30);
    box4 = new Box(415,330,30,30);
    box5 = new Box(445,330,30,30);
    box6 = new Box(430,300,30,30);

    bird = new Bird(200,50);

    slingshot = new SlingShot(bird.body,{x:200, y:300});
}

function draw(){
    if (backgroundImg){
        background(backgroundImg);
    }

    Engine.update(engine);

    box1.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();
    box6.display();

    bird.display();
    slingshot.display();


}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
       slingshot.attach(bird.body);
       gameState="onSling";
       bird.trajectory=[];
       Matter.Body.setPosition(bird.body, {x:200,y:50});
       console.log(bird);
       Matter.Body.setAngle(bird.body, 0)
    }
}