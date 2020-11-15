var u;
var l;
var a;
var mods = [];
var x;
var y;
var count;
let ps;

class Particle {
  constructor(position) {
    this.acceleration = createVector(0, 0.0);
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.position = position.copy();
    this.lifespan = 255.0;
    this.mass = 3; // Let's do something better here!
  }

  run() {
    this.update();
    this.display();
  }

  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }

  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 2.0;
  }

  // Method to display
  display() {
    stroke(200, this.lifespan);
    strokeWeight(2);
    fill(127, this.lifespan);
    ellipse(this.position.x, this.position.y, 12, 12);
    ellipse(this.position.x+200, this.position.y, 12, 12);
    ellipse(this.position.x-200, this.position.y, 12, 12);
    ellipse(this.position.x, this.position.y+200, 12, 12);
    ellipse(this.position.x+200, this.position.y+200, 12, 12);
    ellipse(this.position.x-200, this.position.y+200, 12, 12);
    ellipse(this.position.x, this.position.y+400, 12, 12);
    ellipse(this.position.x+200, this.position.y+400, 12, 12);
    ellipse(this.position.x-200, this.position.y+400, 12, 12);
  }

  // Is the particle still useful?
  isDead() {
    if (this.lifespan < 100) {
      return true;
    } else {
      return false;
    }
  }
}


class ParticleSystem {
  constructor(position) {
    this.origin = position.copy();
    this.particles = [];
  }

  addParticle() {
    this.particles.push(new Particle(this.origin));
  }

  run() {
    // Run every particle
    // ES6 for..of loop
    for (let particle of this.particles) {
      particle.run();
    }

    // Filter removes any elements of the array that do not pass the test
    this.particles = this.particles.filter(particle => !particle.isDead());
  }

  // A function to apply a force to all Particles
  applyForce(f) {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].applyForce(f);
    }
  }
}





function setup() {
  createCanvas(700, 600);
  u = 90;
  l = 20;
  var highCount = height / 80;
  var wideCount = width / 80;
  count = int(highCount * wideCount);
  
  setFrameRate(60);
  ps = new ParticleSystem(createVector(width / 2, 50));

  var index = 0;
  for (var xc = 0; xc < wideCount; xc++) {
    for (var yc = 0; yc < highCount; yc++) {
      mods[index++] = new Module(int(xc) * u, int(yc) * u);
    }
  }
}

function draw() {
  
  

    background(15, 150, 300);
    stroke(400);

  
    let gravity = createVector(0, 0.1);
  ps.applyForce(gravity);

  ps.addParticle();
  ps.run();

  strokeWeight(2);

  translate(30, 50);

  for (var i = 0; i <= 70; i++) {
    mods[i].update();
    mods[i].draw2();
  }

}

function Module(_x, _y) {
  this.x = _x;
  this.y = _y;
  this.a = 0;

}

Module.prototype.update = function() {
  if (mouseIsPressed) {
    this.a = -20 * (atan2(mouseY - this.y, mouseX - this.x));
  } else {
    this.a = atan2(mouseY - this.y, mouseX - this.x);
  }
}

Module.prototype.draw2 = function() {
  push();
  translate(this.x, this.y);
  rotate(this.a);
  line(-l, 0, l, 0);
  pop();
}
