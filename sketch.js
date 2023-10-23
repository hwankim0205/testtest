let state = 0; // 0: photo available 1: photo taken
let switcher = 0; // 0:front 1:rear
let cam;
let switchBtn;

let rearSetting;
let frontSetting;

let detector;

function preload(){
  detector = ml5.objectDetector('cocossd');
}

function setup() {
  //pixelDensity(1);
  createCanvas(displayWidth, displayHeight);
  
  switchBtn = createButton('Switch');
  switchBtn.position(width-250,10);
  switchBtn.size(50,50);
  switchBtn.mouseReleased(switchCam);
  
  
  
  
  rearSetting = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment" //rear camera
      }
    }
  }
  
  frontSetting = {
    audio: false,
    video: {
      facingMode: {
        exact: "user" //front camera
      }
    }
  }
  
  cam = createCapture(frontSetting);
  cam.hide();
  
  detector.detect(cam, gotDetections);
  
}

function switchCam(){
  if(switcher == 0){
    switcher = 1;
    cam.remove();
    cam = createCapture(rearSetting);
    cam.hide();
  }else if(switcher == 1){
    switcher = 0;
    cam.remove();
    cam = createCapture(frontSetting);
    cam.hide();
  }
}

function draw() {
  background(0);
  
  image(cam,0,100,displayWidth,661);
  
  
  fill(230);
  noStroke();
  ellipse(width/2,800,70);
  fill(230,0,0);
  ellipse(width/2,800,50);
}

function mouseReleased(){
  if(dist(mouseX, mouseY, width/2, 400) <= 35){
    let fileName = 'myCanvas_'+day()+hour()+minute()+second()+'.jpg'
    saveCanvas(image, fileName);
  }
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(results);  
  
  for (let i = 0; i < results.length; i++) {
    let object = results[i];
    
      stroke(0,255,0);
      strokeWeight(4);
      noFill();
      rect(object.x, object.y, object.width, object.height);
      noStroke();
      fill(0,255,0);
      textSize(24);
      text(object.label, object.x + 10, object.y+24);
      
      let centerX = object.x + (object.width/2);
      let centerY = object.y + (object.height/2);
      strokeWeight(10);
      stroke(0,255,0);
      point(centerX, centerY);
    
  }
}
