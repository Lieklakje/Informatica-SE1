var raster = {
  aantalRijen: 12,
  aantalKolommen: 18,
  celGrootte: null,

  berekenCelGrootte() {
    this.celGrootte = canvas.width / this.aantalKolommen;
  },
  teken() {
    push();
    noFill();
    stroke("grey");
    for (rij = 0; rij < this.aantalRijen; rij++) {
      for (kolom = 0; kolom < this.aantalKolommen; kolom++) {
        rect(
          kolom * this.celGrootte,
          rij * this.celGrootte,
          this.celGrootte,
          this.celGrootte,
        );
      }
    }
    pop();
  },
};

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

    this.x = constrain(this.x, 0, canvas.width);
    this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);

    if (this.x == canvas.width) {
      this.gehaald = true;
    }
  },

  wordtGeraakt(vijand) {
    if (this.x == vijand.x && this.y == vijand.y) {
      return true;
    } else {
      return false;
    }
  },

  toon() {
    image(
      this.animatie[this.frameNummer],
      this.x,
      this.y,
      raster.celGrootte,
      raster.celGrootte,
    );
  },
};

var alice = {
  x: 700,
  y: 200,
  sprite: null,
  stapGrootte: null,

  beweeg() {
    this.x += floor(random(-1, 2)) * this.stapGrootte;
    this.y += floor(random(-1, 2)) * this.stapGrootte;

    this.x = constrain(this.x, 0, canvas.width - raster.celGrootte);
    this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);
  },

  toon() {
    image(this.sprite, this.x, this.y, raster.celGrootte, raster.celGrootte);
  },
};

//nieuwe vijand

var eviljos = {
  x: 700,
  y: 200,
  sprite: null,
  stapGrootte: null,

  beweeg() {
    this.x += floor(random(-1, 2)) * this.stapGrootte;
    this.y += floor(random(-1, 2)) * this.stapGrootte;

    this.x = constrain(this.x, 0, canvas.width - raster.celGrootte);
    this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);
  },

  toon() {
    image(this.sprite, this.x, this.y, raster.celGrootte, raster.celGrootte);
  },
};

//nieuwe vijand

var bom1_obj = {
  x: 500,
  y: 200,
  sprite: null,
  stapGrootte: null,
  kolom: 0,
  snelheid: 10,

  beweeg() {
    //this.y += floor(random(-1, 2)) * this.stapGrootte;
    //this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);

    if (this.y > 500 || this.y < 50) {
      this.snelheid = -1 * this.snelheid;
    }
    this.y = this.y + this.snelheid;

    this.x = constrain(this.x, 0, canvas.width - raster.celGrootte);
    //this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);
  },

  toon() {
    image(this.sprite, this.x, this.y, raster.celGrootte, raster.celGrootte);
  },
};

var bom2_obj = {
  x: 700,
  y: 200,
  sprite: null,
  stapGrootte: null,
  kolom: 0,
  snelheid: 40,

  beweeg() {
    if (this.y > 500 || this.y < 50) {
      this.snelheid = -1 * this.snelheid;
    }
    this.y = this.y + this.snelheid;

    //this.y += floor(random(-1, 2)) * this.stapGrootte;

    this.x = constrain(this.x, 0, canvas.width - raster.celGrootte);
    //this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);
  },

  toon() {
    image(this.sprite, this.x, this.y, raster.celGrootte, raster.celGrootte);
  },
};

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
    fill("lawngreen");
    ellipse(this.x, this.y, this.diameter);
  },
};

function preload() {
  brug = loadImage("images/backgrounds/dame_op_brug_1800.jpg");
  alice.sprite = loadImage("images/sprites/Alice100px/Alice.png");
  eviljos.sprite = loadImage("images/eviljos.webp");
  for (var b = 0; b < jos.aantalFrames; b++) {
    frameJos = loadImage("images/sprites/Jos100px/Jos_" + b + ".png");
    jos.animatie.push(frameJos);
  }
  bom1_obj.sprite = loadImage("INF/BombAngryBirds.png");
  bom2_obj.sprite = loadImage("INF/BombAngryBirds.png");
}

function setup() {
  canvas = createCanvas(900, 600);
  canvas.parent();
  frameRate(10);
  textFont("Verdana");
  textSize(90);
  raster.berekenCelGrootte();
  jos.stapGrootte = 1 * raster.celGrootte;
  alice.stapGrootte = 1 * raster.celGrootte;
  eviljos.stapGrootte = 1 * raster.celGrootte;
  bom1_obj.stapGrootte = 1 * raster.celGrootte;
  bom2_obj.stapGrootte = 1 * raster.celGrootte;

  pingpong.straal = pingpong.diameter / 2;
  pingpong.x = pingpong.diameter;
  pingpong.y = pingpong.x;

  bom1_obj.kolom = floor(random(10, 17));
  bom2_obj.kolom = floor(random(10, 17));

  while (bom1_obj.kolom == bom2_obj.kolom) {
    bom2_obj.kolom = floor(random(10, 17));
  }

  bom1_obj.x = bom1_obj.kolom * raster.celGrootte;
  bom2_obj.x = bom2_obj.kolom * raster.celGrootte;
}

function draw() {
  background(brug);
  raster.teken();

  jos.beweeg();
  alice.beweeg();
  pingpong.beweeg();
  eviljos.beweeg();
  bom1_obj.beweeg();
  bom2_obj.beweeg();

  jos.toon();
  alice.toon();
  pingpong.toon();
  eviljos.toon();
  bom1_obj.toon();
  bom2_obj.toon();

  if (jos.wordtGeraakt(alice)) {
    background("red");
    fill("white");
    text("Je hebt verloren :(", 30, 300);
    noLoop();
  }

  if (jos.wordtGeraakt(eviljos)) {
    background("red");
    fill("white");
    text("Je hebt verloren :(", 30, 300);
    noLoop();
  }

  if (jos.wordtGeraakt(bom1_obj)) {
    background("red");
    fill("white");
    text("Je hebt verloren :(", 30, 300);
    noLoop();
  }

  if (jos.wordtGeraakt(bom2_obj)) {
    background("red");
    fill("white");
    text("Je hebt verloren :(", 30, 300);
    noLoop();
  }

  if (jos.gehaald) {
    background("green");
    fill("white");
    text("Je hebt gewonnen! ", 30, 300);
    noLoop();
  }

  // blauwe rand
  push();
  noFill();
  stroke("blue");
  strokeWeight(8);
  rect(4, 4, width - 8, height - 8);
  pop();
}
