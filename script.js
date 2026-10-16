var raster = {
  aantalRijen: 12,
  aantalKolommen: 18,
  celGrootte: null,

  berekenCelGrootte() {
    this.celGrootte = canvas.width/this.aantalKolommen;
  },
  teken() {
    push();
    noFill();
    stroke('grey');
    for (rij=0;rij<this.aantalRijen;rij++) {
      for (kolom=0;kolom<this.aantalKolommen;kolom++) {
        rect(kolom*this.celGrootte,rij*this.celGrootte,this.celGrootte,this.celGrootte);
      }
    }
    pop();
  }
}

var jos = {
  x: 400,
  y: 300,
  animatie: [],
  aantalFrames: 6,
  frameNummer: 3,
  stapGrootte: null,
  gehaald: false,

  beweeg() {
    // links
    if (keyIsDown(65)) {
      this.x -= this.stapGrootte;
      this.frameNummer = 2;
    }
    // rechts
    if (keyIsDown(68)) {
      this.x += this.stapGrootte;
      this.frameNummer = 1;
    }
    // omhoog
    if (keyIsDown(87)) {
      this.y -= this.stapGrootte;
      this.frameNummer = 4;
    }
    // omlaag
    if (keyIsDown(83)) {
      this.y += this.stapGrootte;
      this.frameNummer = 5;
    }



    this.x = constrain(this.x,0,canvas.width);
    this.y = constrain(this.y,0,canvas.height - raster.celGrootte);

    if (this.x == canvas.width) {
      this.gehaald = true;
    }
  },

  wordtGeraakt(vijand) {
    if (this.x == vijand.x && this.y == vijand.y) {
      return true;
    }
    else {
      return false;
    }
  },

  toon() {
    image(this.animatie[this.frameNummer],this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}


var alice = {
  x: 700,
  y: 200,
  sprite: null,
  stapGrootte: null,

  beweeg() {
    this.x += floor(random(-1,2))*this.stapGrootte;
    this.y += floor(random(-1,2))*this.stapGrootte;

    this.x = constrain(this.x,0,canvas.width - raster.celGrootte);
    this.y = constrain(this.y,0,canvas.height - raster.celGrootte);
  },

  toon() {
    image(this.sprite,this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}

//nieuwe vijand

var eviljos = {
  x: 700,
  y: 200,
  sprite: null,
  stapGrootte: null,

  beweeg() {
    this.x += floor(random(-1,2))*this.stapGrootte;
    this.y += floor(random(-1,2))*this.stapGrootte;

    this.x = constrain(this.x,0,canvas.width - raster.celGrootte);
    this.y = constrain(this.y,0,canvas.height - raster.celGrootte);
  },

  toon() {
    image(this.sprite,this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}

// pingpong
var pingpong = {
  diameter: 50,
  straal: null,
  x: null,
  y: 0,
  speedX: 25,
  speedY: 20,
  slow: 1.0,

  beweeg() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x <= this.straal || this.x >= canvas.width - this.straal) {
      this.speedX *= -this.slow;
    }
    if (this.y <= this.straal || this.y >= canvas.height - this.straal) {
      this.speedY *= -this.slow;
      this.speedX *= this.slow;
    }
  },

  toon() {
    noStroke();
    fill('lawngreen');
    ellipse(this.x, this.y, this.diameter);
  }
}

var bom1;
var bom2;

var bomKolom1;
var bomKolom2;

var bomX2;
var bomX2;

var bomY1 = 100;
var bomY2 = 100;

var snelheid1 = 10;
var snelheid2 = 40;

function preload() {
  brug = loadImage("images/backgrounds/dame_op_brug_1800.jpg");
  alice.sprite = loadImage("images/sprites/Alice100px/Alice.png");
  eviljos.sprite = loadImage("images/eviljos.webp");
  for (var b = 0;b < jos.aantalFrames;b++) {
    frameJos = loadImage("images/sprites/Jos100px/Jos_" + b + ".png");
    jos.animatie.push(frameJos);
  bom1 = loadImage("INF/BombAngryBirds.png");
  bom2 = loadImage("INF/BombAngryBirds.png");
  }
}

function setup() {
  canvas = createCanvas(900,600);
  canvas.parent();
  frameRate(10);
  textFont("Verdana");
  textSize(90);
  raster.berekenCelGrootte();
  jos.stapGrootte = 1*raster.celGrootte;
  alice.stapGrootte = 1*raster.celGrootte;
  eviljos.stapGrootte = 1*raster.celGrootte;
  bom1.stapGrootte = 1*raster.celGrootte;
  bom2.stapGrootte = 1*raster.celGrootte;
  
  pingpong.straal = pingpong.diameter / 2;
  pingpong.x = pingpong.diameter;
  pingpong.y = pingpong.x;
  
  bomX1 = random(460, 600);
  bomX2 = random(650, 820);

  bomKolom1 = floor(random(10, 18));
  bomKolom2 = floor(random(10, 18));

  while (bomKolom2 == bomKolom1) {
    bomKolom2 = floor(random(10, 18));
  }

  bomX1 = bomKolom1*raster.celGrootte;
  bomX2 = bomKolom2*raster.celGrootte;

}

function draw() {
  background(brug);
  raster.teken();
  
  jos.beweeg();
  alice.beweeg();
  pingpong.beweeg();
  eviljos.beweeg();

  jos.toon();
  alice.toon();
  pingpong.toon();
  eviljos.toon();
  
  image(bom1, bomX1, bomY1, 50, 50);
  image(bom2, bomX2, bomY2, 50, 50);

  if (bomY1 > 500 || bomY1 < 50) {
    snelheid1 = -snelheid1;
  }
  bomY1 = bomY1 + snelheid1;

  if (bomY2 > 500 || bomY2 < 50) {
    snelheid2 = -snelheid2;
  }
  bomY2 = bomY2 + snelheid2;
  
  if (jos.wordtGeraakt(alice)) {
    background('red');
    fill('white');
    text("Je hebt verloren :(",30,300);
    noLoop();
  }

  if (jos.wordtGeraakt(eviljos)) {
    background('red');
    fill('white');
    text("Je hebt verloren :(",30,300);
    noLoop();
  }

  if (jos.wordtGeraakt(bom1)) {
    background('red');
    fill('white');
    text("Je hebt verloren :(",30,300);
    noLoop();
  }

  if (jos.wordtGeraakt(bom2)) {
    background('red');
    fill('white');
    text("Je hebt verloren :(",30,300);
    noLoop();
  }
  
  if (jos.gehaald) {
    background('green');
    fill('white');
    text("Je hebt gewonnen! ",30,300);
    noLoop();
  }
 

  // blauwe rand
  push();
  noFill();
  stroke('blue');
  strokeWeight(8);
  rect(4, 4, width - 8, height - 8);
  pop();
}