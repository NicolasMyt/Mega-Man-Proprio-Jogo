MegaManAnimation = ''
MegaManAnimationTimer = 0
MegaManSpeedY = 0
isOnGround = false
MegaManSpeedX = 0
MegaManLandSoundPlaying = false
MegaManSlideTimer = 0
MegaManDirection = 1
MegaManAnimationName = ''

var MegaManSensorLeft;
var MegaManSensorRight;
var MegaManSensorTop;
var MegaManSensorDown;
var ground;
var BackGroundCollides;
var BackGroundImage;
var Collider;


function setup() {
  createCanvas(256,240);
  frameRate(60)
  ground = createSprite(0,300,1280,20)
  ground2 = createSprite(1280,270,1280,20)
  ground3 = createSprite(0,220,1280,20)
  Collider = new Group()
  Collider.add(ground)
  Collider.add(ground2)
  Collider.add(ground3)

  MegaManMask = createSprite(200,250,15,24)

  MegaManSprite = createSprite(200,200)
  MegaManSprite.addImage('Walking',MegaManWalk)
  MegaManSprite.addAnimation('Walking2',MegaManWalk2)
  MegaManSprite.addAnimation('Idle',MegaManIdle)
  MegaManSprite.addImage('Jump',MegaManJump)
  MegaManSprite.addImage('Slide',MegaManSlideImage)

  MegaManSensorLeft = createSprite(MegaManMask.position.x + 9,MegaManMask.position.y,MegaManMask.width/4,MegaManMask.height/2)
  MegaManSensorLeft.shapeColor = 'red'
  MegaManSensorLeft.visible = false
  
  MegaManSensorRight = createSprite(MegaManMask.position.x - 9,MegaManMask.position.y,MegaManMask.width/4,MegaManMask.height/2)
  MegaManSensorRight.shapeColor = 'blue'
  MegaManSensorRight.visible = false
  
  MegaManSensorTop = createSprite(MegaManMask.position.x,MegaManMask.position.y - 10,MegaManMask.width,MegaManMask.height/8)
  MegaManSensorTop.shapeColor = 'Yellow'
  MegaManSensorTop.visible = false

  MegaManSensorDown = createSprite(MegaManMask.position.x,MegaManMask.position.y + 10,MegaManMask.width,MegaManMask.height/8)
  MegaManSensorDown.shapeColor = 'Yellow'
  MegaManSensorDown.visible = false


}
function preload(){
  MegaManWalk = loadImage('assets/Mega Man/MegaManWalk.png')
  MegaManWalk2 = loadAnimation('assets/Mega Man/MegaManWalk1.png','assets/Mega Man/MegaManWalk2.png','assets/Mega Man/MegaManWalk3.png','assets/Mega Man/MegaManWalk2.png')
  MegaManIdle = loadAnimation('assets/Mega Man/MegaManIdle.png','assets/Mega Man/MegaManIdle.png','assets/Mega Man/MegaManIdle.png','assets/Mega Man/MegaManIdle.png','assets/Mega Man/MegaManIdle.png','assets/Mega Man/MegaManIdle2.png')
  MegaManJump = loadImage('assets/Mega Man/MegaManJump.png')
  MegaManSlideImage = loadImage('assets/Mega Man/MegaManSlide.png')

  BackGroundImage = loadImage('assets/Background/Background.png')
  BackGroundImage2 = loadImage('assets/Background/BackgroundCollide.png')
  BackGroundCollides = createSprite(0,0)
  BackGroundCollides.addImage(BackGroundImage2,'Image')




  //Load sounds
  MegaManLandSound = loadSound('assets/MegaManSounds/06 - MegamanLand.wav')

}
function draw(){
  background(0,0,0);
  //Position Sensores and Mega man Sprite
  MegaManMask.position.x =  MegaManMask.position.x + floor(MegaManSpeedX)
  MegaManMask.position.y = MegaManMask.position.y + MegaManSpeedY
   
  MegaManSprite.position.x = floor(MegaManMask.position.x)
  MegaManSprite.position.y = floor(MegaManMask.position.y) - 4

  MegaManSensorLeft.position.x = floor(MegaManMask.position.x) - 9
  MegaManSensorLeft.position.y = floor(MegaManMask.position.y)

  MegaManSensorRight.position.x = floor(MegaManMask.position.x) + 9
  MegaManSensorRight.position.y = floor(MegaManMask.position.y)

  MegaManSensorTop.position.x = floor(MegaManMask.position.x)
  MegaManSensorTop.position.y = floor(MegaManMask.position.y) - MegaManMask.height/2 - 2

  MegaManSensorDown.position.x = floor(MegaManMask.position.x)
  MegaManSensorDown.position.y = floor(MegaManMask.position.y) - MegaManMask.height *2 + 2


  camera.position.x = MegaManMask.position.x
  camera.position.y = MegaManMask.position.y



  image(BackGroundImage,0,0)

  if (!MegaManMask.isTouching(Collider)){
    MegaManLandSoundPlaying = false
    isOnGround = false
    if(MegaManSpeedY < 4){
      MegaManSpeedY += 0.2
    }
  }
   else{
    if(MegaManMask.isTouching(Collider)){
      MegaManSpeedY = 0
      isOnGround = true
      if (MegaManLandSoundPlaying == false){
        MegaManLandSoundPlaying = true
        MegaManLandSound.play()
      }
    }
  }

  if (MegaManAnimationTimer > 0){
    MegaManAnimationTimer -= 1
    if(!isOnGround){
      MegaManAnimationTimer = -1
    }
  }

  if (MegaManSensorLeft.isTouching(Collider)&& MegaManSpeedX < 0 || MegaManSensorRight.isTouching(Collider) && MegaManSpeedX > 0){
    MegaManSpeedX = 0
  }
  if(MegaManSensorTop.isTouching(Collider) && MegaManSpeedY < 0){
    MegaManSpeedY = 0
  }
  if (MegaManSlideTimer == 0){

    if(keyDown('LEFT_ARROW') && !MegaManSensorLeft.isTouching(Collider)){
    MegaManSpeedX = -2
    }
    if(keyDown('RIGHT_ARROW') && !MegaManSensorRight.isTouching(Collider)){
      MegaManSpeedX = 2
    }
    if(MegaManSpeedX < 0 && !keyDown('LEFT_ARROW') || MegaManSpeedX > 0 && !keyDown('RIGHT_ARROW')){
      MegaManSpeedX = 0
    }
    //Jump
    if (isOnGround == true && !MegaManSensorTop.isTouching(Collider)){
      if(keyWentDown('z') || keyWentDown('UP_ARROW')){
        MegaManSpeedY = -5
      }
    }
  }
  else{
    if (MegaManSlideTimer > 0){
      MegaManSlideTimer -= 1
      MegaManSpeedX = 4 * MegaManDirection
    }
  }

  if (isOnGround == true && MegaManSlideTimer == 0){
    if(keyWentDown('c') || keyWentDown('down') ){
      MegaManSlideTimer = 20
    }
  }


  MegaManSprite.mirrorX(MegaManDirection)
  //Animations
  if (MegaManSpeedX < 0){
   MegaManDirection = -1
  }
  if (MegaManSpeedX > 0){
    MegaManDirection = 1
  }
  
  if(isOnGround == false){
    MegaManSprite.changeImage('Jump',MegaManJump)
    MegaManAnimation = 'Jump'
  }
  else{
    if (MegaManSpeedX == 0){
      MegaManSprite.changeAnimation('Idle',MegaManIdle)
      MegaManAnimation = 'Idle'
    }
    else{

      if(MegaManAnimation != 'Walking' && MegaManAnimation != "Walking2"){
      MegaManSprite.changeImage('Walking',MegaManWalk)
      MegaManAnimation = 'Walking'
      MegaManAnimationTimer = 2
      }

      if(MegaManAnimation == 'Walking' && MegaManAnimationTimer == 0){
        MegaManAnimation = 'Walking2'
        MegaManSprite.changeAnimation('Walking2',MegaManWalk2)
      }

      if (MegaManSlideTimer > 0){
        MegaManSprite.changeImage('Slide',MegaManSlideImage)
        MegaManAnimation = 'Slide'
      }
    }
  }
  drawSprites();
}







