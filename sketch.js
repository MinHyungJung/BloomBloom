let friction = 0.98;
let maxAge = 100;
let maxSpeed = 10;
var particles = [];
var magnet;
var magnetStrength = 5;

function setup() {
  createCanvas(400, 400);
  magnet = createVector(200,200);
}

function draw() {
  background(230,100,100);
  strokeWeight(2);
  fill(255,0,0);
  ellipse(magnet.x,magnet.y,50,50);
  fill(0);
  particles.push(new particle(mouseX,mouseY,random(-1,1),random(-1,1)));
  for (let p of particles){
    p.draw();
    p.move();
    p.magnet();
  }
  
  particles = particles.filter(p => { return p.lifespan < maxAge})
}

function particle(x, y, xvel, yvel){
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
      var magpull = p5.Vector.sub(magnet,this.pos);
      var magstrength = magnetStrength / this.pos.dist(magnet);
      magpull.normalize().mult(magstrength);
      this.vel.add(magpull);
    }
  
  


}
