let friction = 0.98;
let maxlifespan = 100;
let maxSpeed = 20;
var learnings = [];
var me;
var meStrength = 25;
var Confettis = [];
var msx = 50;
var msy = 50;

function setup() {
  createCanvas(700, 700);
  me = createVector(350,350);
}

function draw() {
  background(230,100,100);
  strokeWeight(2);
  fill(255,0,0);
  ellipse(me.x,me.y,msx,msy);
  msx = msx + 0.1;
  msy = msy + 0.1;
  fill(0);
  
  learnings.push(new learning(mouseX,mouseY,random(-1,1),random(-1,1)));
  for (let p of learnings){
    p.draw();
    p.move();
    p.magnet();
  }
  
  Confettis.push(new Confetti(mouseX,mouseY,random(-1,1),random(-1,1)));
  for (let p of Confettis){
    p.draw();
    p.move();
    p.magnet();
  }
  
  learnings = learnings.filter(p => { return p.lifespan < maxlifespan})
  
  Confettis = Confettis.filter(p => { return p.lifespan < maxlifespan})
}

function learning(x, y, xvel, yvel){
    this.pos = createVector(x,y);
    this.vel = createVector(random(-1, 1), random(-2, 2));
    this.lifespan = 10;
  
  
    this.draw = function(){
      stroke(200, this.lifespan);
    strokeWeight(2);
    fill(127, this.lifespan*10);
       ellipse(this.pos.x,this.pos.y,12,12); 
    }
  
    this.move = function(){
      this.pos.add(this.vel);
      this.vel.mult(friction);
      this.vel.limit(maxSpeed);
      this.lifespan++;
    }
  
    this.magnet = function(){
      var magpull = p5.Vector.sub(me,this.pos);
      var magstrength = meStrength / this.pos.dist(me);
      magpull.normalize().mult(magstrength);
      this.vel.add(magpull);
    }
}

function Confetti(x, y, xvel, yvel){
    this.pos = createVector(x,y);
    this.vel = createVector(random(-1, 1), random(-2, 2));
    this.lifespan = 10;
  
  
    this.draw = function(){
    rectMode(CENTER);
    fill(255, this.lifespan*5);
    stroke(255, this.lifespan);
    strokeWeight(2);
    push();
    translate(this.pos.x, this.pos.y);
    var theta = map(this.pos.x, 0, width, 0, TWO_PI * 2);
    rotate(theta);
    rect(0, 0, 12, 12);
    pop();
    }
  
    this.move = function(){
      this.pos.add(this.vel);
      this.vel.mult(friction);
      this.vel.limit(maxSpeed);
      this.lifespan++;
    }
  
    this.magnet = function(){
      var magpull = p5.Vector.sub(me,this.pos);
      var magstrength = meStrength / this.pos.dist(me);
      magpull.normalize().mult(magstrength);
      this.vel.add(magpull);
    }
}
