// need to separate triangle out from other shapes because of the way it's styled
// i.e. height and width have to remain 0,0
// and need to manipulate border-radius instead

// also look into changing saturation based on scroll
// should be the most saturdated in the middle of scroll, i.e. peak of life
// birth = black and white
// peak = saturated colors
// near death = black and white
// death = completely black

// add some illustrations to represent growth / life

class Triangle {
    constructor(borderTop, borderBottom, borderRight, borderLeft) {
        this.borderTop = borderTop;
        this.borderBottom = borderBottom;
        this.borderRight = borderRight;
        this.borderLeft = borderLeft;
    }

    append() {
        $('.container').append('<div class="shape triangle"></div>');
        $('.triangle').css({
            "borderRight": this.borderRight,
            "borderLeft": this.borderLeft,
            "borderTop": this.borderTop,
            "borderBottom": this.borderBottom,
        });
    }
}

class Circle {
    constructor(width, height, borderRadius, backgroundColor) {
        this.height = height;
        this.width = width;
        this.borderRadius = borderRadius;
        this.backgroundColor = backgroundColor;
    }

    append() {
        $('.container').append('<div class="shape circle"></div>');
        $('.circle').css({
            "width": this.width,
            "height": this.width,
            "borderRadius": this.borderRadius,
            "background-color": this.backgroundColor
        });
    }
}

class Square {

}

class Rectangle {

}

class Ripple {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    append() {
        $('.container').append('<div class="ripple heartbeat"></div>');
        $('.ripple').css({
            "top": this.y + "px",
            "left": this.x + "px",
            "width": this.width,
            "height": this.height,
            "borderRadius": "50%"
        })
    }
}

function newRippleOnClick() {
    let newRipple;
    $(window).click(function(e) {
        newRipple = new Ripple(e.clientX, e.clientY, 100, 100).append();
    });
}

// random color generator
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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

function manipulateMusicBasedOnScrollSpeed() {
    $(window).scroll(function() {
        var speed = (checkScrollSpeed());
        console.log(speed);
        if (speed > 15) {
            song.playbackRate = 2.0;
        } else {
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
                    pauseBackgroundAnimation();
                    isPlaying = false;

                }
            })
            .catch(error => {
                song.pause();
                stopScroll();
                pauseBackgroundAnimation();

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
function triggerShapesOnScroll() {

    // shape variables
    // let shapes = [];
    // let shape = $('.shape');
    // let shapeHeight = shape.height();
    // let shapeWidth = shape.width();

    $(window).on('scroll');

    $(window).scroll(function(e) {

        setInterval(function() {
        	let newTriangle = new Triangle(getRandomInt(0, 200) + "px solid " + getRandomColor(), "none", getRandomInt(0, 200) + "px solid transparent", getRandomInt(0, 200) + "px solid transparent").append();
        	let newCircle = new Circle(getRandomInt(0, 200), this.width, "100%", getRandomColor()).append();
        	$(window).off('scroll');
        }, 3000);

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
            song.muted = true;
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
    window.scrollBy(0, 10);
    scrolldelay = setTimeout(pageScroll, 2000);
}

function stopScroll() {
    clearTimeout(scrolldelay);
}

// ###
// check scroll position
// if scroll position is middle of page, then start to reduce shapes
// instead of adding
// also reduce saturation in color
function checkScrollPosition() {
    if (scroll > 2000) {
    	console.log("scroll position = " + scroll);
    } else {

    }
}

function startBackgroundAnimation() {
    $('.escher').addClass('scaleInSlowly');
    $('.escher').removeClass('pausedAnimation');
}

function pauseBackgroundAnimation() {
    $('.escher').addClass('pausedAnimation');
}

// ###
// Initialize experience
function init() {
    $(window).scrollTop(0);
    triggerShapesOnScroll();
    animateShapeOnClick();

    $(document).on("keypress", function(e) {
        if (e.keyCode == 13) {

            toggleMusic();

            $('.title').css({
                "display": "none"
            })

        } else {}
    });

    newRippleOnClick();
    manipulateMusicBasedOnScrollSpeed();

    checkScrollPosition();

    fadeOutAtBottomOfPage();

}

// ###
// Call init when ready
$(document).ready(init);