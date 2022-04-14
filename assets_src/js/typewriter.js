import Typewriter from "typewriter-effect/dist/core";

const app = document.getElementById("infoText");

new Typewriter(app, {
  loop: true,
  strings: [
    "<i class='fa fa-heart' aria-hidden='true'></i> Love Tech",
    "<i class='fa fa-home' aria-hidden='true'></i> Home Lab & Automation",
    "<i class='fa fa-cloud' aria-hidden='true'></i> Web Development",
    "<i class='fa fa-book' aria-hidden='true'></i> Blogging",
  ],
  autoStart: true,
  pauseFor: 750,
});
