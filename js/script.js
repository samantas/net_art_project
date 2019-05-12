const shapeTypes = [
    "circle",
    "triangle",
    "rectangle"
];

class Shape {
    constructor(height, width, shapeType) {
        this.height = height;
        this.width = width;
        this.shapeType = shapeType;
        this.borderRadius = getRandomInt(0, 100);
        // this.rotate = getRandomInt(0, 100);
        // this.scaleX = getRandomInt(0, 3);
        // this.scaleY = getRandomInt(0, 3);
    }

    display() {
        $('.container').append('<div class="shape ' + this.shapeType + '"></div>')
        $('.shape').css({
            "position": "fixed",
            "top": "50%",
            "left": "50%",
            "width": this.width,
            "height": this.height,
            "borderRadius": this.borderRadius,
            "transform": "translate(-50%,-50%)"
        });
    }
}

// ###
// animate shapes on click via keyframe
function animateShapeOnClick() {
    $('.container').click(function() {
        if ($('.shape').hasClass("animate")) {
            $('.shape').removeClass("animate");
        } else {
            $('.shape').addClass("animate");
        }
    });
}

// look into changing div size dynamically on scroll
// https://stackoverflow.com/questions/31005636/adjust-div-height-dynamically-based-on-scroll

// also look into changing saturation based on scroll
// should be the most saturdated in the middle of scroll, i.e. peak of life
// birth = black and white
// peak = saturated colors
// near death = black and white
// death = completely black


function manipulateMusicBasedOnScrollSpeed() {
    $(window).scroll(function() {
        var speed = (checkScrollSpeed());
        console.log(speed);
        if (speed > 15) {
            song.playbackRate = 2.0;
        }
        else {
            song.playbackRate = 1.0;
        }
    });
}


// ###
// audio variables
let song = document.getElementById('audio');
song.src = 'assets/lies.mp3';
var isPlaying = false;

// toggle the song based on play state
function toggleMusic() {
    var playPromise = song.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
                if (!isPlaying) {
                    song.play();
                    pageScroll();
                    startBackgroundAnimation();
                    isPlaying = true;

                } else if (isPlaying) {
                    song.pause();
                    stopScroll();
                    isPlaying = false;

                }
            })
            .catch(error => {
                // Auto-play was prevented
                // Show paused UI.
                song.pause();
                stopScroll();

            });
    }
}

// ###
// global variables
let windowHeight = $(window).height();
let documentHeight = $(document).height();

// scroll variables
let scroll = $(window).scrollTop();

// trigger shapes on scroll
function triggerAndTransformShapesOnScroll() {

    // shape variables
    let shapes = [];
    let shape = $('.shape');
    let shapeHeight = shape.height();
    let shapeWidth = shape.width();

    $(window).scroll(function(e) {
        let shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];

        for (let i = 0; i < 1; i++) {
            let shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
            shapes[i] = new Shape(getRandomInt(0, 1000), getRandomInt(0, 700), shapeType);
        }

        for (let i = 0; i < shapes.length; i++) {
            shapes[i].display();
        }

    });

}

// ###
// Stop music and fade out at the bottom of the page
function fadeOutAtBottomOfPage() {
    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            // you're at the bottom of the page
            $('.everything').animate({
                opacity: 0
            }, 1000);
            toggleMusic();
        }
    };
}

// ###
// Get a random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ###
// Check how fast the user is scrolling
var checkScrollSpeed = (function(settings) {
    settings = settings || {};

    var lastPos, newPos, timer, delta,
        delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

    function clear() {
        lastPos = null;
        delta = 0;
    }

    clear();

    return function() {
        newPos = window.scrollY;
        if (lastPos != null) { // && newPos < maxScroll 
            delta = newPos - lastPos;
        }
        lastPos = newPos;
        clearTimeout(timer);
        timer = setTimeout(clear, delay);
        return delta;
    };
})();

// ###
// Toggle auto scroll
let scrolldelay;

function pageScroll() {
    window.scrollBy(0, 1);
    scrolldelay = setTimeout(pageScroll, 2000);
}

function stopScroll() {
    clearTimeout(scrolldelay);
}
// ###

function startBackgroundAnimation() {
    $('.escher').addClass('scaleInSlowly');
}

// ###
// Initialize experience
function init() {
    $(window).scrollTop(0);
    triggerAndTransformShapesOnScroll();
    animateShapeOnClick();

    $(document).on("keypress", function(e) {
        // use e.which
        toggleMusic();
    });

    manipulateMusicBasedOnScrollSpeed();

    fadeOutAtBottomOfPage();

}

// ###
// Call init when ready
$(document).ready(init);