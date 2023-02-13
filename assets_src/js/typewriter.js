import Typewriter from "typewriter-effect/dist/core"

const app = document.getElementById("typewriter");

new Typewriter(app, {
    loop: true,
    strings: [
        "<i class='fa fa-heart' aria-hidden='true'></i> Love Tech",
        "<i class='fa fa-cloud' aria-hidden='true'></i> Web Development"
    ],
    autoStart: true,
    pauseFor: 750,
})