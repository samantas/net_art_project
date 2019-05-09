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

function playMusicOnScroll() {
    // if scroll is within certain speed, playback rate normal

    // if user scrolls too fast, playback rate 2x speed

    // if user doesn't scroll at all, stop music
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
        new Shape(getRandomInt(0, 1000), getRandomInt(0, 700), shapeType).display();

        // for (let i = 0; i < 1; i++) {
        //     let shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        //     shapes[i] = new Shape(getRandomInt(0, 500), getRandomInt(0, 500), shapeType);
        // }
        // for (let i = 0; i < shapes.length; i++) {
        //     shapes[i].display();
        // }

        // scrollPosition = $(this).scrollTop();
        // shape.height(shapeHeight - scrollPosition);
        // shape.width(shapeWidth - scrollPosition);

        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
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

function init() {
    $(this).scrollTop(0);
    triggerAndTransformShapesOnScroll();
    animateShapeOnClick();
    $('.escher').addClass('scaleInSlowly');
}

$(document).ready(init);