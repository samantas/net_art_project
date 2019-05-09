class Shape {
    constructor(height, width, shapeType) {
        this.height = height;
        this.width = width;
        this.shapeType = shapeType;
        // this.borderRadius = getRandomInt(0, 100);
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
            // "transform": "translate(-50%,-50%) rotate(" + this.rotate + "deg) scaleX(" + this.scaleX + ") scaleY(" + this.scaleY + ")"
        });
    }

    // transform() {
    //     $('.shape').css({
    //         "transform": "translate(-50%,-50%) rotate(" + this.rotate + "deg) scaleX(" + this.scaleX + ") scaleY(" + this.scaleY + ")"
    //     });
    // }
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
// deat = completely black

function triggerAndTransformShapesOnScroll() {
    let shapes = [];
    let shape = $('.shape');
    let shapeHeight = shape.height();
    let shapeWidth = shape.width();
    let scrollPosition;

    $(window).scroll(function() {
        let shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        let scroll = $(window).scrollTop();
        let windowHeight = $(window).height();
        let documentHeight = $(document).height();

        // if (scroll === 500) {
        // 	console.log("scroll = " + scroll);
        //     $(window).off("scroll");
        //     let newShape = new Shape(getRandomInt(0, 1000), getRandomInt(0, 700), shapeType).display();
        //     $(newShape).fadeIn('slow', function() {
        //         setTimeout(function() {
        //             $(newShape).fadeOut('slow');
        //             $(newShape).fadeIn('slow');
        //             setTimeout(function() {
        //                 $(newShape).fadeOut('slow');
        //                 $(newShape).fadeIn('slow');
        //                 setTimeout(function() {
        //                     $(newShape).fadeOut('slow');
        //                     $(newShape).fadeIn('slow');
        //                 }, 2000)
        //             }, 2000)
        //         }, 2000);
        //     })
        // }

        for (let i = 0; i < 1; i++) {
            let shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
            shapes[i] = new Shape(getRandomInt(0, 1000), getRandomInt(0, 700), shapeType);
        }

        for (let i = 0; i < shapes.length; i++) {
            shapes[i].display();
        }

        // scrollPosition = $(this).scrollTop();
        // shape.height(shapeHeight - scrollPosition);
        // shape.width(shapeWidth - scrollPosition);

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

function checkIfAudioIsPlaying() {
    let myAudio = $('#audio');

    // ########################
    // WHY IS THIS UNDEFINED???
    console.log("duration: " + myAudio.duration);

    if (myAudio.duration > 0 && !myAudio.paused) {
        //Its playing...do your job
        console.log("audio is playing");

    } else {
        //Not playing...maybe paused, stopped or never played.
        console.log("audio is not playing");

    }
}

function init() {
    $(this).scrollTop(0);
    triggerAndTransformShapesOnScroll();
    animateShapeOnClick();
    $('.escher').addClass('scaleInSlowly');

    detectScrollBehavior();
    checkIfAudioIsPlaying();
}

$(document).ready(init);