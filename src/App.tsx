import React, { useEffect } from "react";
import Sketch from "react-p5";
import p5Types from "p5";

let x: number;
let y: number;

let xspeed: number;
let yspeed: number;

let dvd: p5Types.Image;

let r: number;
let g: number;
let b: number;

let startingSpeed: number;

const pickColor = (p5: p5Types) => {
  r = p5.random(100, 256);
  g = p5.random(100, 256);
  b = p5.random(100, 256);
};

const setup = (p5: p5Types, canvasParentRef: Element) => {
  p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  x = p5.random(p5.width);
  y = p5.random(p5.height);

 if (!startingSpeed) {
   startingSpeed = 5;
 }

  xspeed = startingSpeed;
  yspeed = startingSpeed;

  pickColor(p5);
};

const preload = (p5: p5Types) => {
  dvd = p5.loadImage("DVD_logo_4K.png", image => {
    image.resize(p5.displayWidth/6, 0);
  }, failure => {
    console.log(failure);
  });
};

const draw = (p5: p5Types) => {
  p5.background(0);
  p5.tint(r, g, b);
  p5.image(dvd, x, y);
  

  x += xspeed;
  y += yspeed;

  if (x + dvd.width >= p5.width) {
    xspeed = -xspeed;
    x = p5.width - dvd.width;
    pickColor(p5);
  } else if (x <= 0) {
    xspeed = -xspeed;
    x = 0;
    pickColor(p5);
  }

  if (y + dvd.height >= p5.height) {
    yspeed = -yspeed;
    y = p5.height - dvd.height;
    pickColor(p5);
  } else if (y <= 0) {
    yspeed = -yspeed;
    y = 0;
    pickColor(p5);
  }
};

const onResize = (p5: p5Types) => {
  p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  dvd.resize(p5.displayWidth/6, 0);

  x = p5.random(p5.width);
  y = p5.random(p5.height);
};

const App = () => {

  useEffect(() => {
    document.title = "DVD Bouncer";

    document.addEventListener("speedControl", handleSpeedChangeEvent);

    return () => {
      document.removeEventListener("speedControl", handleSpeedChangeEvent);
    };
  });

  return <Sketch windowResized={onResize} preload={preload} setup={setup} draw={draw} />;
};

const handleSpeedChangeEvent = (event: any) => {
  startingSpeed = parseInt(event?.detail ?? 5);
  xspeed = startingSpeed;
  yspeed = startingSpeed;
};


export default App;
