// at the end add some simple text -- 'fin' or 'death'
// add a refresh button --> reset experience
// add a note to reference the original M.C. Escher piece


// also look into changing saturation based on scroll
// should be the most saturdated in the middle of scroll, i.e. peak of life
// birth = black and white
// peak = saturated colors
// near death = black and white
// death = completely black

// add some illustrations to represent growth / life?

// assign unique IDs to each shape
function assignUniqueIdsToShapes() {
    $.each($('.shape'), function(ind) {
        $(this).attr('id', 'shape-' + parseInt(ind + 1));
    });
}

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

    style() {
        // instead of appending and styling
        // append separately and then add styles
        // for each unique ID
        // so there are many more different shapes
    }

    assignID() {
        $.each($('.triangle'), function(ind) {
            $(this).attr('id', 'shape-' + parseInt(ind + 1));
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
    constructor(width, height, backgroundColor) {
        this.height = height;
        this.width = width;
        this.backgroundColor = backgroundColor;
    }

    append() {
        $('.container').append('<div class="shape square"></div>');
        $('.square').css({
            "width": this.width,
            "height": this.width,
            "background-color": this.backgroundColor
        });
    }
}

class Rectangle {
    constructor(width, height, backgroundColor) {
        this.height = height;
        this.width = width;
        this.backgroundColor = backgroundColor;
    }

    append() {
        $('.container').append('<div class="shape rectangle"></div>');
        $('.rectangle').css({
            "width": this.width,
            "height": this.height,
            "background-color": this.backgroundColor
        });
    }
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
        if ($('.shape').hasClass("animateIn")) {
            $('.shape').removeClass("animateIn");
            $('.shape').addClass("animateOut");
        } else {
            $('.shape').addClass("animateIn");
            $('.shape').removeClass("animateOut");
        }
    });
}

function manipulateMusicBasedOnScrollSpeed() {
    $(window).scroll(function() {
        var speed = (checkScrollSpeed());
        console.log(speed);
        if (speed > 20) {
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
                    triggerShapes();
                    startBackgroundAnimation();
                    isPlaying = true;

                } else if (isPlaying) {
                    song.pause();
                    stopScroll();
                    clearInterval(triggerDelay);
                    pauseBackgroundAnimation();
                    isPlaying = false;

                }
            })
            .catch(error => {
                song.pause();
                stopScroll();
                clearInterval(triggerDelay);
                pauseBackgroundAnimation();
                isPlaying = false;
            });
    }
}

// scroll variables
let scroll = $(window).scrollTop();
let triggerDelay;
let resetScroll;

var scrollHandler = function() {
    scroll = $(window).scrollTop();
}

// ###
// trigger shapes on scroll
function triggerShapes() {
    // $(window).scroll(function(e) {

    triggerDelay = setInterval(function() {
        let newTriangle = new Triangle(getRandomInt(0, 200) + "px solid " + getRandomColor(), "none", getRandomInt(0, 200) + "px solid transparent", getRandomInt(0, 200) + "px solid transparent").append();
        let newCircle = new Circle(getRandomInt(0, 200), this.width, "100%", getRandomColor()).append();
        let newSquare = new Square(getRandomInt(0, 200), this.width, getRandomColor()).append();
        let newRectangle = new Rectangle(getRandomInt(0, 200), getRandomInt(0, 200), getRandomColor()).append();

        // add counter

        // assignUniqueIdsToShapes();

        $(window).off('scroll', scrollHandler);
    }, 3000);

    // });

    resetScroll = setInterval(function() {
        $(window).on('scroll', scrollHandler);
    }, 3000);
}

// ###
// Stop music and fade out at the bottom of the page
function fadeOutAtBottomOfPage() {
    var wait;
    wait = setTimeout(function() {
        window.onscroll = function(ev) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                
                $('.everything').animate({
                    opacity: 0
                }, 1000);

                toggleMusic();
                song.muted = true;

                $('.outro').animate({
                    opacity: 1
                }, 1000);

                $('.intro').css("display", "none");
                $('.everything').css("display", "none");
            }
        };
    }, 1000);
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

let scrollDelay;

function pageScroll() {
    window.scrollBy(0, 100);
    scrollDelay = setTimeout(pageScroll, 2000);

}

function stopScroll() {
    clearTimeout(scrollDelay);
}

// ###
// check scroll position
// reduce saturation in color???
function checkScrollPosition() {
    if (scroll > 2000) {

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

function handleShapeAnimation() {
    let shape = $('.shape');

    if (shape.hasClass('animateIn' || 'animateOut')) {
        $('.shape').addClass('pausedAnimation');
    } else if (shape.hasClass('pausedAnimation')) {
        $('.shape').removeClass('pausedAnimation');
    } else {

    }
}

// ###
// Initialize experience
function init() {
    $(window).scrollTop(0);

    animateShapeOnClick();

    $('.intro-text').animate({
        opacity: 1
    }, 2000, function() {});

    $('.container').css("display", "none");

    $(document).on("keypress", function(e) {
        if (e.keyCode == 13) {

            toggleMusic();
            handleShapeAnimation();

            $(".intro").animate({
                opacity: 0,
                display: "toggle"
            }, 2000, function() {
                // Animation complete.
            });

            $('.container').css("display", "flex");

        } else {}
    });

    newRippleOnClick();
    manipulateMusicBasedOnScrollSpeed();

    checkScrollPosition();

    fadeOutAtBottomOfPage();

    $('#restart').click(function() {
        location.reload();
    });
}

// ###
// Call init when ready
$(document).ready(init);