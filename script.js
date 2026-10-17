// Het raster is het speelveld
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

// Jos is de speler waar je mee speelt, te besturen met WASD.
// Het heeft ook een test die checkt of een vijand op hetzelfde coördinaat is met jos.
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

    // begrens de uitkomst, zodat jos niet het scherm uit kan
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

// Alice is een vijand
var alice = {
  x: 700,
  y: 200,
  sprite: null,
  stapGrootte: null,

  // willekeurige bewegen in de x en y richting, kan ook diagonaal zijn.
  beweeg() {
    // uitkomst is -1, 0 of 1 keer de stap grootte
    this.x += floor(random(-1, 2)) * this.stapGrootte;
    this.y += floor(random(-1, 2)) * this.stapGrootte;

    // begrens de uitkomst, zodat alice niet het scherm uit kan
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
    // uitkomst is -1, 0 of 1 keer de stap grootte
    this.x += floor(random(-1, 2)) * this.stapGrootte;
    this.y += floor(random(-1, 2)) * this.stapGrootte;

    // begrens de uitkomst, zodat eviljos niet het scherm uit kan
    this.x = constrain(this.x, 0, canvas.width - raster.celGrootte);
    this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);
  },

  toon() {
    image(this.sprite, this.x, this.y, raster.celGrootte, raster.celGrootte);
  },
};

//nieuwe vijand, bom1
var bom1 = {
  x: 500,
  y: 200,
  sprite: null,
  stapGrootte: null,
  kolom: 0,
  richting: "omlaag",
  
  beweeg() {
    if (this.richting == "omlaag") {
      this.y = this.y - this.stapGrootte;
    } else {
      this.y = this.y + this.stapGrootte;
    }

    if (this.y > (canvas.height - raster.celGrootte)) {
      this.richting = "omlaag";
    }

    if (this.y < (0 + raster.celGrootte)) {
      this.richting = "omhoog";
    }
    
    // begrens de uitkomst, zodat bom1 niet het scherm uit kan
    this.x = constrain(this.x, 0, canvas.width - raster.celGrootte);
    this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);
  },

  toon() {
    image(this.sprite, this.x, this.y, raster.celGrootte, raster.celGrootte);
  },
};

var bom2 = {
  x: 700,
  y: 200,
  sprite: null,
  stapGrootte: null,
  kolom: 0,

  beweeg() {
    // Richting naar beneden, stap er af, richting omhoog, stap naar boven
    if (this.richting == "omlaag") {
      this.y = this.y - this.stapGrootte;
    } else {
      this.y = this.y + this.stapGrootte;
    }

    // Laatste plekje bereikt? Andere kant op
    if (this.y > (canvas.height - raster.celGrootte)) {
      this.richting = "omlaag";
    }

    // Laatste plekje bereikt? Andere kant op
    if (this.y < (0 + raster.celGrootte)) {
      this.richting = "omhoog";
    }

    // begrens de uitkomst, zodat bom2 niet het scherm uit kan
    this.x = constrain(this.x, 0, canvas.width - raster.celGrootte);
    this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);
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

// inladen van alle plaatjes, ook wel sprites
function preload() {
  brug = loadImage("images/backgrounds/dame_op_brug_1800.jpg");
  alice.sprite = loadImage("images/sprites/Alice100px/Alice.png");
  eviljos.sprite = loadImage("images/eviljos.webp");
  for (var b = 0; b < jos.aantalFrames; b++) {
    frameJos = loadImage("images/sprites/Jos100px/Jos_" + b + ".png");
    jos.animatie.push(frameJos);
  }
  bom1.sprite = loadImage("INF/BombAngryBirds.png");
  bom2.sprite = loadImage("INF/BombAngryBirds.png");
}

// start waarden van alles
function setup() {
  canvas = createCanvas(900, 600);
  canvas.parent();
  frameRate(10);
  textFont("Verdana");
  textSize(90);
  raster.berekenCelGrootte();

  // Berekende cel grote in pixels is een grondgetal voor een stap
  jos.stapGrootte = 1 * raster.celGrootte;
  alice.stapGrootte = 1 * raster.celGrootte;
  eviljos.stapGrootte = 1 * raster.celGrootte;
  bom1.stapGrootte = 1 * raster.celGrootte;
  bom2.stapGrootte = 2 * raster.celGrootte;

  pingpong.straal = pingpong.diameter / 2;
  pingpong.x = pingpong.diameter;
  pingpong.y = pingpong.x;

  // Willekeurige kolom voor de bommen
  bom1.kolom = floor(random(10, 17));
  bom2.kolom = floor(random(10, 17));

  // Geen twee bommen in 1 kolom, doorzoeken naar vrije kolom.
  while (bom1.kolom == bom2.kolom) {
    bom2.kolom = floor(random(10, 17));
  }

  // De bom x waarde is afhankelijk van waar die moet komen
  bom1.x = bom1.kolom * raster.celGrootte;
  bom2.x = bom2.kolom * raster.celGrootte;
}

function draw() {
  background(brug);
  raster.teken();

  jos.beweeg();
  alice.beweeg();
  pingpong.beweeg();
  eviljos.beweeg();
  bom1.beweeg();
  bom2.beweeg();

  jos.toon();
  alice.toon();
  pingpong.toon();
  eviljos.toon();
  bom1.toon();
  bom2.toon();

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

  if (jos.wordtGeraakt(bom1)) {
    background("red");
    fill("white");
    text("Je hebt verloren :(", 30, 300);
    noLoop();
  }

  if (jos.wordtGeraakt(bom2)) {
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