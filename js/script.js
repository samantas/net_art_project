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

const shapeTypes = [
    "circle",
    "triangle",
    "rectangle"
];

function detectScrollBehavior() {
    // if scroll is within certain speed, playback rate normal

    // if user scrolls too fast, playback rate 2x speed

    // if user doesn't scroll at all, stop music

    $(window).scroll(function() {
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function() {
            // do something
            console.log("Haven't scrolled in 250ms!");
        }, 250));
    });
}

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

// audio variables
let song = document.getElementById('audio');
song.src = 'assets/lies.mp3';
var isPlaying = false;

function toggleMusic() {
    var playPromise = song.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
                if (!isPlaying) {
                    song.play();
                    isPlaying = true;

                } else if (isPlaying) {

                    song.pause();
                    isPlaying = false;

                }
            })
            .catch(error => {
                // Auto-play was prevented
                // Show paused UI.
                song.pause();
            });
    }
}

// all things that happen on scroll
function triggerAndTransformShapesOnScroll() {

    // shape variables
    let shapes = [];
    let shape = $('.shape');
    let shapeHeight = shape.height();
    let shapeWidth = shape.width();

    // scroll variables
    let scrollPosition;
    let scroll = $(window).scrollTop();

    $(window).scroll(function(e) {
        let shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        let windowHeight = $(window).height();
        let documentHeight = $(document).height();

        console.log(checkScrollSpeed());

        for (let i = 0; i < 1; i++) {
            let shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
            shapes[i] = new Shape(getRandomInt(0, 1000), getRandomInt(0, 700), shapeType);
        }

        for (let i = 0; i < shapes.length; i++) {
            shapes[i].display();
        }

        if (scroll + windowHeight == documentHeight) {
            // fade everything out
            $('.everything').animate({
                opacity: 0
            }, 1000);
        }

    });

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

// Auto scroll the page
// function pageScroll() {
//     window.scrollBy(0, 1);
//     scrolldelay = setTimeout(pageScroll, 10);
// }

function init() {
    $(window).scrollTop(0);
    triggerAndTransformShapesOnScroll();
    animateShapeOnClick();
    $('.escher').addClass('scaleInSlowly');

    detectScrollBehavior();
    $(document).on("keypress", function(e) {
        // use e.which
        toggleMusic();
    });
}

$(document).ready(init);