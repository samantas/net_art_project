class Shape {
    constructor(x, y, height, width, shapeType) {
        this.x = x;
        this.y = y;
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
            "width": this.width,
            "height": this.height,
            "borderRadius": this.borderRadius,
            "transform": "rotate(" + this.rotate + "deg) scaleX(" + this.scaleX + ") scaleY(" + this.scaleY + ")"
        });
    }

    // transform() {
    //     $('.shape').css({
    //         "transform": "rotate(" + this.rotate + "deg) scaleX(" + this.scaleX + ") scaleY(" + this.scaleY + ")"
    //     });
    // }
}

const shapeTypes = [
    "circle",
    "triangle",
    "rectangle"
];

function animateShapeOnClick() {
    $('.container').click(function() {
        if ($('.shape').hasClass("animate")) {
            $('.shape').removeClass("animate");
        } else {
            $('.shape').addClass("animate");
        }
    });
}

function triggerShapesOnScroll() {
    let shapes = [];

    $(window).scroll(function() {
        for (let i = 0; i < 1; i++) {
            let shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
            shapes[i] = new Shape(getRandomInt(0, 500), getRandomInt(0, 500), getRandomInt(0, 500), getRandomInt(0, 500), shapeType);
        }

        for (let i = 0; i < shapes.length; i++) {
            shapes[i].display();
        }
    });

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init() {
    triggerShapesOnScroll();
    animateShapeOnClick();
}

$(document).ready(init);