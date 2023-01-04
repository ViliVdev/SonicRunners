/*
* Game: ViliV
* Author: Cleber Vilela
* Author URL: https://viliv.dev/
* Version: 1.0.0
*/

//Game Code

var i = 0;
var fps = 60;
var cycle = -1;
var cycle1 = -1;
var cycle2 = -1;
var cycle3 = -1;
var cycle4 = -1;
var cycle5 = -1;
//const start = Date.now();

//console.log('starting timer...');
// expected output: starting timer...

setInterval(() => {
  //const timer = Date.now() - start;
  cycle = cycle + 1;
  if (cycle > 3) {cycle = 0};
  //console.log(`miliseconds elapsed = ${Math.floor(timer)}`);
  
  }, 1200/fps);

setInterval(() => {
  cycle1 = cycle1 + 1;
  if (cycle1 > 3) {cycle1 = 0};
  }, 1800/fps);
setInterval(() => {
  cycle2 = cycle2 + 1;
  if (cycle2 > 3) {cycle2 = 0};
  }, 3600/fps);
setInterval(() => {
  cycle3 = cycle3 + 1;
  if (cycle3 > 3) {cycle3 = 0};
  }, 6000/fps);
setInterval(() => {
  cycle4 = cycle4 + 1;
  if (cycle4 > 3) {cycle4 = 0};
  }, 9000/fps);
setInterval(() => {
  cycle5 = cycle5 + 1;
  if (cycle5 > 3) {cycle5 = 0};
  }, 12000/fps);

function random( min, max ) {
  return Math.round( min + ( Math.random() * ( max - min ) ) );
}

function randomChoice(array){
  return array[ Math.round( random( 0, array.length - 1 ) ) ];
}
// Put the Canvas to render at your desired size
var Frame = Render.create({
  fullscreen: false,
  width: 640,
  height: 480,
  container: document.getElementById('container')
});

/*******************/
/*****VECTOR1*******/
/*******************/

function Vector1(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.previousX = 0;
  this.previousY = 0;
};

Vector1.prototype.setPosition = function(x, y) {

  this.previousX = this.x;
  this.previousY = this.y;

  this.x = x;
  this.y = y;

};

Vector1.prototype.setX = function(x) {

  this.previousX = this.x;
  this.x = x;

};

Vector1.prototype.setY = function(y) {

  this.previousY = this.y;
  this.y = y;

};


Vector1.prototype.insercects = function(obj){

  if(obj.x < this.x + this.width && obj.y < this.y + this.height &&
     obj.x + obj.width > this.x && obj.y + obj.height > this.y ){
    return true;
  }

  return false;
};

Vector1.prototype.insercectsLeft = function(obj){

  if(obj.x < this.x + this.width && obj.y < this.y + this.height ){
    return true;
  }

  return false;
};

Vector1.prototype.insercectsRight = function(obj){

  if(obj.x + obj.width > this.x && obj.y < this.y + this.height ){
    return true;
  }

  return false;
};

/*******************/
/*****VECTOR2*******/
/*******************/

function Vector2(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.previousX = 0;
  this.previousY = 0;
};

Vector2.prototype.setPosition = function(x, y) {

  this.previousX = this.x;
  this.previousY = this.y;

  this.x = x;
  this.y = y;

};

Vector2.prototype.setX = function(x) {

  this.previousX = this.x;
  this.x = x;

};

Vector2.prototype.setY = function(y) {

  this.previousY = this.y;
  this.y = y;

};


Vector2.prototype.insercects = function(obj){

  if(obj.x < this.x + this.width && obj.y < this.y + this.height &&
     obj.x + obj.width > this.x && obj.y + obj.height > this.y ){
    return true;
  }

  return false;
};

Vector2.prototype.insercectsLeft = function(obj){

  if(obj.x < this.x + this.width && obj.y < this.y + this.height ){
    return true;
  }

  return false;
};


Vector2.prototype.insercectsRight = function(obj){

  if(obj.x + obj.width > this.x && obj.y < this.y + this.height ){
    return true;
  }

  return false;
};


/****************/
/*****PLAYER****/
/**************/

function Player(options){

  this.setPosition(options.x, options.y);
  this.width = options.width;
  this.height = options.height;
  this.velocityX = 0;
  this.velocityY = 0;
  this.jumpSize = -13;
  this.color = '#FFFFFF';
  
}

Player.prototype = new Vector1;

Player.prototype.update = function() {
  this.velocityX *= 0.89;
  this.velocityY += 1;
  this.setPosition(this.x + this.velocityX, this.y + this.velocityY);

  if(this.y > Frame.height){
    this.x = 150;
    this.y = 50;
    this.velocityX = 0;
    this.velocityY = 0;
    Frame.jumpCount = 0;
    Frame.aceleration = 0;
    Frame.acelerationTweening = 0;
    Frame.scoreColor = '#F5B707';
    Frame.platformManager.maxDistanceBetween = 300;
    Frame.platformManager.updateWhenLose();
  }

  if(this.x < 0){
    this.x = 0;
    this.velocityX = 0;  
  }
  
  if(this.y < 0){
    this.y = 0;
    this.velocityY = 0;  
  }

  if((this.x + this.width) > Frame.width){
    this.x = (Frame.width - this.width);
    this.velocityX = 0;  
  }

  if((Frame.keys.UP || Frame.keys.SPACE || Frame.keys.W || Frame.dragging) && this.velocityY < -8){
    this.velocityY += -0.75;
  }

  if((Frame.keys.LEFT || Frame.keys.A || Frame.dragging) && this.velocityX > -8){
    this.velocityX += -1.75;
  };

  if((Frame.keys.RIGHT || Frame.keys.D || Frame.dragging) && this.velocityX < 8){
    this.velocityX += 1.75;
  };

  if(Frame.keys.ENTER){
    Frame.pause;
  };

};
// Sonic Run

Player.prototype.draw = function() {
  
  let img = document.createElement("img");
  img.src = "img/img.png";
  let spriteW = 278, spriteH = 320;
  Frame.drawImage(img, cycle * spriteW, 0, spriteW, spriteH, this.x, this.y, this.width, this.height);
 
};

/*****************/
/*****PLAYER 1****/
/*****************/

function Player1(options){

  this.setPosition(options.x, options.y);
  this.width = options.width;
  this.height = options.height;
  this.velocityX = 0;
  this.velocityY = 0;
  this.jumpSize = -13;
  this.color = '#181818';
  
}

Player1.prototype = new Vector1;

Player1.prototype.update = function() {
  this.velocityX *= 0.89;
  this.velocityY += 0;
  this.setPosition(this.x + this.velocityX, this.y + this.velocityY);

  if(this.y > Frame.height){
    this.x = 350;
    this.y = 50;
    this.velocityX = 0;
    this.velocityY = 0;
   /* Frame.jumpCount = 0;
    Frame.aceleration = 0;
    Frame.acelerationTweening = 0;
    Frame.scoreColor = '#F5B707';
    Frame.platformManager.maxDistanceBetween = 300;
    Frame.platformManager.updateWhenLose();*/
  }

  if(this.x < 0){
    this.x = 0;
    this.velocityX = 0;  
  }
  
  if(this.y < 0){
    this.y = 0;
    this.velocityY = 0;  
  }

  if((this.x + this.width) > Frame.width){
    this.x = (Frame.width - this.width);
    this.velocityX = 0;  
  }

  if((Frame.keys.UP || Frame.keys.SPACE || Frame.keys.W || Frame.dragging) && this.velocityY < -8){
    this.velocityY += -0.75;
  }

  if((Frame.keys.LEFT || Frame.keys.A || Frame.dragging) && this.velocityX > -8){
    this.velocityX += -1.75;
  };

  if((Frame.keys.RIGHT || Frame.keys.D || Frame.dragging) && this.velocityX < 8){
    this.velocityX += 1.75;
  };

  if(Frame.keys.ENTER){
    Frame.pause;
  };

};
// Tails flight not enabled

Player1.prototype.draw = function() {
  
  let img2 = document.createElement("img");
  img2.src = "img/img2.png";
  let spriteW = 278, spriteH = 320;
  Frame.drawImage(img2, cycle * spriteW, 0, spriteW, spriteH, this.x, this.y, this.width, this.height);
  
};


/*******************/
/*****PLATFORM*****/
/******************/

function Platform(options){
  this.x = options.x;
  this.y = options.y;
  this.width = options.width;
  this.height = options.height;
  this.previousX = 0;
  this.previousY = 0;
  this.color = options.color;
}

Platform.prototype = new Vector2;

Platform.prototype.draw = function() {
  Frame.fillStyle = this.color;
  //Frame.fillRect(this.x, this.y, this.width, 70);
  let imgp = document.createElement("img");
  imgp.src = "img/tub.png";
  //let spriteW = 615, spriteH = 140;
  Frame.drawImage(imgp, this.x, this.y, this.width, this.height);
};



/*******************PLATFORM MANAGER*************/

function PlatformManager(){
  this.maxDistanceBetween = 300;
  this.colors = ['#0B0EDF', '#F2230F'];

  this.first = new Platform({x: 300, y: Frame.height * 2 / random(3,4) , width: Frame.width, height: Frame.height / 12})
  this.second = new Platform({x: (this.first.x + this.first.width) + random(this.maxDistanceBetween / 2, this.maxDistanceBetween), y: random(this.first.y - random(50,100), Frame.height - random(50,100)), width: 400, height: Frame.height / 12})
  this.third = new Platform({x: (this.second.x + this.second.width) + random(this.maxDistanceBetween / 2, this.maxDistanceBetween), y: random(this.second.y - random(50,100), Frame.height - random(50,100)), width: 400, height: Frame.height / 12})
  
  this.first.color = randomChoice(this.colors);
  this.second.color = randomChoice(this.colors);
  this.third.color = randomChoice(this.colors);

  this.colliding = false;

  this.platforms = [this.first, this.second, this.third];
}

PlatformManager.prototype.update = function() {

  this.first.x -= 3 + Frame.aceleration;
  if(this.first.x + this.first.width < 0 ){
    this.first.width = random(Frame.width / 2, Frame.width);
    this.first.x = (this.third.x + this.third.width) + random(this.maxDistanceBetween / 2, this.maxDistanceBetween);
    this.first.y = random(this.third.y - 32, Frame.height - 80);
    this.first.height = Frame.height / 12
    this.first.color = randomChoice(this.colors);
  }

  this.second.x -= 3 + Frame.aceleration;
  if(this.second.x + this.second.width < 0 ){
    this.second.width = random(Frame.width / 2, Frame.width);
    this.second.x = (this.first.x + this.first.width) + random(this.maxDistanceBetween / 2, this.maxDistanceBetween);
    this.second.y = random(this.first.y - random(50,100), Frame.height - random(50,100));
    this.second.height = Frame.height / 12
    this.second.color = randomChoice(this.colors);
  }

  this.third.x -= 3 + Frame.aceleration;
  if(this.third.x + this.third.width < 0 ){
    this.third.width = random(Frame.width / 2, Frame.width);
    this.third.x = (this.second.x + this.second.width) + random(this.maxDistanceBetween / 2, this.maxDistanceBetween);
    this.third.y = random(this.second.y - random(50,100), Frame.height - random(50,100));
    this.third.height = Frame.height / 12
    this.third.color = randomChoice(this.colors);
  }
};

PlatformManager.prototype.updateWhenLose = function() {

  this.first.x = 300;
  this.first.color = randomChoice(this.colors);
  this.first.y = Frame.height * 2 / random(3,4);
  this.second.x = (this.first.x + this.first.width) + random(this.maxDistanceBetween / 2, this.maxDistanceBetween);
  this.third.x = (this.second.x + this.second.width) + random(this.maxDistanceBetween / 2, this.maxDistanceBetween);
};

/*******************PARTICLE SYSTEM*************/

function Particle(options){
  this.x = options.x;
  this.y = options.y;
  this.size = 10;
  this.velocityX = options.velocityX || random(-(Frame.aceleration * 3) + -8,-(Frame.aceleration * 3));
  this.velocityY = options.velocityY || random(-(Frame.aceleration * 3) + -8,-(Frame.aceleration * 3));
  this.color = options.color;
}

Particle.prototype.update = function() {
  this.x += this.velocityX;
  this.y += this.velocityY;
  this.size *= 0.89;
};

Particle.prototype.draw = function() {
  Frame.fillStyle = this.color;
  Frame.fillRect(this.x, this.y, this.size, this.size);
};

/*******************/
/*******RINGS******/
/******************/


/*******************/
/*****ENEMYS*******/
/******************/

function Enemy(options){
  this.x = options.x;
  this.y = options.y;
  this.width = options.width;
  this.height = options.height;
  this.previousX = 0;
  this.previousY = 0;
  this.color = options.color;
}

Enemy.prototype = new Vector2;

Enemy.prototype.draw = function() {
  Frame.fillStyle = this.color;
  //Frame.fillRect(this.x, this.y, this.width, 70);
  let imgb = document.createElement("img");
  imgb.src = "img/badnick.png";
  let spriteW = 48, spriteH = 48;
  Frame.drawImage(imgb, cycle3 * spriteW, 0 * spriteH, spriteW, spriteH, this.x, this.y, this.width, this.height);
};



/*******************ENEMY MANAGER***************/

function EnemyManager(){
  this.maxDistanceBetween = 600;
  this.colors = ['#0B0EDF', '#F2230F'];
  this.first = new Enemy({x: Frame.width + random(this.maxDistanceBetween / 3, this.maxDistanceBetween), y: Frame.height / 2, width: 50, height: 50})
  this.second = new Enemy({x: Frame.width + random(this.maxDistanceBetween / 3, this.maxDistanceBetween), y: random(this.first.y + random(50,100), Frame.height / random(2,8)), width: 50, height: 50})
  //this.third = new Enemy({x: Frame.width + random(this.maxDistanceBetween / 3, this.maxDistanceBetween), y: random(this.second.y + random(50,100), Frame.height / random(2,8)), width: 50, height: 50})
  //this.fourth = new Enemy({x: Frame.width + random(this.maxDistanceBetween / 3, this.maxDistanceBetween), y: random(this.third.y + random(50,100), Frame.height / random(2,8)), width: 50, height: 50})
  
  this.first.color = randomChoice(this.colors);
  this.second.color = randomChoice(this.colors);
  //this.third.color = randomChoice(this.colors);
  //this.fourth.color = randomChoice(this.colors);

  this.colliding = false;

  this.enemys = [this.first, this.second];
}

EnemyManager.prototype.update = function() {

  this.first.x -= 1 + Frame.aceleration;
  if(this.first.x + this.first.width < 0 ){
    this.first.x = Frame.width + random(this.maxDistanceBetween / 3, this.maxDistanceBetween);
    this.first.y = random(this.second.y - random(50,100), Frame.height / random(2,8));
    this.first.color = randomChoice(this.colors);
  }

  this.second.x -= 1 + Frame.aceleration;
  if(this.second.x + this.second.width < 0 ){
    this.second.x = Frame.width + random(this.maxDistanceBetween / 3, this.maxDistanceBetween);
    this.second.y = random(this.first.y + random(50,100), Frame.height / random(2,8));
    this.second.color = randomChoice(this.colors);
  }

  // this.third.x -= 1 + Frame.aceleration;
  // if(this.third.x + this.third.width < 0 ){
  //   this.third.x = Frame.width + random(this.maxDistanceBetween / 3, this.maxDistanceBetween);
  //   this.third.y = random(this.second.y - random(50,100), Frame.height / random(2,8));
  //   this.third.color = randomChoice(this.colors);
  // }

  // this.fourth.x -= 1 + Frame.aceleration;
  // if(this.fourth.x + this.fourth.width < 0 ){
  //   this.fourth.x = Frame.width + random(this.maxDistanceBetween / 3, this.maxDistanceBetween);
  //   this.fourth.y = random(this.third.y - random(50,100), Frame.height / random(2,8));
  //   this.fourth.color = randomChoice(this.colors);}
};

EnemyManager.prototype.updateWhenLose = function() {

  this.first.x = Frame.width;
  this.first.color = randomChoice(this.colors);
  this.first.y = Frame.height / 2;
  this.second.x = Frame.width + random(this.maxDistanceBetween / 3, this.maxDistanceBetween);
  // this.third.x = Frame.width + random(this.maxDistanceBetween / 3, this.maxDistanceBetween);
  // this.fourth.x = Frame.width + random(this.maxDistanceBetween / 3, this.maxDistanceBetween);
};

/*******************FRAGMENT SYSTEM*************/

function Fragment(options){
  this.x = options.x;
  this.y = options.y;
  this.size = 10;
  this.velocityX = options.velocityX || random(-(Frame.aceleration * 3) + -8,-(Frame.aceleration * 3));
  this.velocityY = options.velocityY || random(-(Frame.aceleration * 3) + -8,-(Frame.aceleration * 3));
  this.color = options.color;
}

Fragment.prototype.update = function() {
  this.x += this.velocityX;
  this.y += this.velocityY;
  this.size *= 0.95;
};

Fragment.prototype.draw = function() {
  Frame.fillStyle = this.color;
  Frame.fillRect(this.x, this.y, this.size, this.size);
};

/************************************************/
/**********FRAME SETUP UPDATE AND DRAW***********/
/***************LAST CODE BLOCK******************/
/************************************************/

Frame.setup = function () {

  this.jumpCount = 0;
  this.aceleration = 0;
  this.acelerationTweening = 0;

  this.player = new Player({x: 150, y: 50, width: 70, height: 70});

  //this.player1 = new Player1({x: 350, y: 90, width: 70, height: 70});

  this.platformManager = new PlatformManager();
  this.enemyManager = new EnemyManager();

  this.particles = [];
  this.particlesIndex = 0;
  this.particlesMax = 20;
  this.collidedPlatform = null;
  this.fragments = [];
  this.fragmentsIndex = 0;
  this.fragmentsMax = 20;
  this.collidedEnemy = null;
  this.scoreColor = '#F5B707';
  this.jumpCountRecord = 0;

};

Frame.update = function() {

  this.player.update();

  switch(this.jumpCount){
    case 10:
      this.acelerationTweening = 1;
      this.platformManager.maxDistanceBetween = 430;
      this.enemyManager.maxDistanceBetween = 600;
      this.scoreColor = '#074CF5';
      break;
    case 30:
      this.acelerationTweening = 2;
      this.platformManager.maxDistanceBetween = 530;
      this.enemyManager.maxDistanceBetween = 600;
      this.scoreColor = '#F5F507';
      break;
    case 50:
      this.acelerationTweening = 3;
      this.platformManager.maxDistanceBetween = 570;
      this.enemyManager.maxDistanceBetween = 500;
      this.scoreColor = '#FE3E00';
      break;
	  case 70:
      this.acelerationTweening = 4;
      this.platformManager.maxDistanceBetween = 600;
      this.enemyManager.maxDistanceBetween = 400;
      this.scoreColor = '#FE00FE';
      break;
  }

  this.aceleration += (this.acelerationTweening - this.aceleration) * 0.01;

  for (i = 0; i < this.platformManager.platforms.length; i++) {
    if(this.player.insercects(this.platformManager.platforms[i])){
      this.collidedPlatform = this.platformManager.platforms[i];
      if (this.player.y < this.platformManager.platforms[i].y) {
        this.player.y = this.platformManager.platforms[i].y;
        this.player.velocityY = 0;
      }

      this.player.x = this.player.x + this.player.velocityX;
      this.player.y = this.player.previousY;

      this.particles[(this.particlesIndex++)%this.particlesMax] = new Particle({
        x: this.player.x,
        y: this.player.y + this.player.height,
        color: this.collidedPlatform.color
      });

      if(this.player.insercectsLeft(this.platformManager.platforms[i])){
        
       this.player.x = 150;
       this.player.y = 50;
        for (i = 0; i < 10; i++) {
          this.particles[(this.particlesIndex++)%this.particlesMax] = new Particle({
            x: this.player.x + this.player.width,
            y: random(this.player.y, this.player.y + this.player.height),
            velocityY: random(-30,30),
            color: randomChoice([this.collidedPlatform.color])
          });
        };
        this.player.velocityY = 0;
        this.player.velocityX = 0;
        this.jumpCount = 0;
        this.aceleration = 0;
        this.acelerationTweening = 0;
        this.scoreColor = '#F5B707';
        this.platformManager.maxDistanceBetween = 300;
        this.platformManager.updateWhenLose();


      } else {

          if(this.dragging || this.keys.SPACE || this.keys.UP || this.keys.W){
          this.player.velocityY = this.player.jumpSize;
          this.jumpCount++;
          if(this.jumpCount > this.jumpCountRecord){
            this.jumpCountRecord = this.jumpCount;
          }
        }

        if((Frame.keys.A || Frame.keys.LEFT || this.dragging) && this.velocityX > -8){
          this.velocityX += -1.75;
        };
      
        if((Frame.keys.D || Frame.keys.RIGHT || this.dragging) && this.velocityX < 8){
          this.velocityX += 1.75;
        };

      }

    }
  };

  for (i = 0; i < this.enemyManager.enemys.length; i++) {
    if(this.player.insercects(this.enemyManager.enemys[i])){
      this.collidedEnemy = this.enemyManager.enemys[i];
      if (this.player.y < this.enemyManager.enemys[i].y) {
        this.player.y = this.enemyManager.enemys[i].y;
        this.player.velocityY = -17;
      }

      this.player.x = this.player.x + this.player.velocityX;
      this.player.y = this.player.previousY;

      this.fragments[(this.fragmentsIndex++)%this.fragmentsMax] = new Fragment({
        x: this.player.x,
        y: this.player.y + this.player.height,
        color: this.collidedEnemy.color
      });

      if(this.player.insercectsLeft(this.enemyManager.enemys[i])){
        
       this.player.x = 150;
       this.player.y = 50;
        for (i = 0; i < 10; i++) {
          this.fragments[(this.fragmentsIndex++)%this.fragmentsMax] = new Fragment({
            x: this.player.x + this.player.width,
            y: random(this.player.y, this.player.y + this.player.height),
            velocityY: random(-30,30),
            color: randomChoice([this.collidedEnemy.color])
          });
        };
        this.player.velocityY = 0;
        this.player.velocityX = 0;
        this.jumpCount = 0;
        this.aceleration = 0;
        this.acelerationTweening = 0;
        this.scoreColor = '#F5B707';
        this.enemyManager.maxDistanceBetween = 300;
        this.enemyManager.updateWhenLose();


      } else {

          if(this.dragging || this.keys.SPACE || this.keys.UP || this.keys.W){
          this.player.velocityY = this.player.jumpSize;
          this.jumpCount++;
          if(this.jumpCount > this.jumpCountRecord){
            this.jumpCountRecord = this.jumpCount;
          }
        }

        if((Frame.keys.A || Frame.keys.LEFT || this.dragging) && this.velocityX > -8){
          this.velocityX += -1.75;
        };
      
        if((Frame.keys.D || Frame.keys.RIGHT || this.dragging) && this.velocityX < 8){
          this.velocityX += 1.75;
        };

      }

    }
  };

  for (i = 0; i < this.platformManager.platforms.length; i++) {
    this.platformManager.update();
  };

  for (i = 0; i < this.particles.length; i++) {
    this.particles[i].update();
  };
  
  for (i = 0; i < this.enemyManager.enemys.length; i++) {
    this.enemyManager.update();
  };

  for (i = 0; i < this.fragments.length; i++) {
    this.fragments[i].update();
  };

};

Frame.draw = function(){
  
  this.player.draw();
  //this.player1.draw();

  for (i = 0; i < this.platformManager.platforms.length; i++) {
    this.platformManager.platforms[i].draw();
  };

  for (i = 0; i < this.enemyManager.enemys.length; i++) {
    this.enemyManager.enemys[i].draw();
  };

  for (i = 0; i < this.particles.length; i++) {
    this.particles[i].draw();
  };

  for (i = 0; i < this.fragments.length; i++) {
    this.fragments[i].draw();
  };

  this.font = '16pt Fantasy' ;
  this.fillStyle = '#F5F507';
  this.fillText('RECORD:  '+this.jumpCountRecord, (30 + (this.aceleration * 4)), 40 - (this.aceleration * 4));
  this.fillStyle = this.scoreColor;
  this.font = (14 + (this.aceleration * 3))+'pt Fantasy';
  this.fillText('SCORE:  '+this.jumpCount, (30 + (this.aceleration * 4)), 65);

};

Frame.resize = function() {

};