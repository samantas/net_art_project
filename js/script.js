class Shape {
    constructor(x, y, height, width, shapeType) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.shapeType = shapeType;
        this.borderRadius = getRandomInt(0, 100);
    }

    display() {
        $('.container').append('<div class="shape ' + this.shapeType + '"></div>')
        $('.shape').css({
            "width": this.width,
            "height": this.height,
            "borderRadius": this.borderRadius
        });
    }

    // grow() {
    //     $('.shape').css({
    //         "width": this.width + "+=100%",
    //         "height": this.height + "+=100%"
    //     })
    // }

    transform() {
    	// rotate, translate, scale
    }
}

const shapeTypes = [
    "circle",
    "triangle",
    "rectangle"
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init() {
    let shapes = [];

    $(window).scroll(function() {
        for (let i = 0; i < 10; i++) {
            let shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
            shapes[i] = new Shape(getRandomInt(0, 500), getRandomInt(0, 500), getRandomInt(0, 500), getRandomInt(0, 500), shapeType);
        }

        for (let i = 0; i < shapes.length; i++) {
            shapes[i].display();
            // shapes[i].grow();
        }
    });
}

$(document).ready(init);