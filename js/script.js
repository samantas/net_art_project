// class Jitter {
//     constructor(x, y, colorR, colorG, colorB) {
//         this.x = x;
//         this.y = y;
//         this.colorR = colorR;
//         this.colorG = colorG;
//         this.colorB = colorB;
//         this.diameter = random(30);
//         this.speed = 2.8;
//         this.dir = 1;
//     }
//     move() {
//         this.x += random(-this.speed, this.speed);
//         this.y += random(-this.speed, this.speed);
//     }

//     display() {
//         noStroke();
//         fill(this.colorR, this.colorG, this.colorB);
//         ellipse(this.x, this.y, this.diameter, this.diameter);
//     }
// }


class Shape {
    constructor(x, y, height, width, className) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.toggleClass = className;
        this.borderRadius = Math.random();
    }

    display() {
        // append a random shape

        $('.container').append('<div class="' + className + '"></div>')
        $('.shape').css({
            "width": this.width,
            "height": this.height,
            "borderRadius": this.borderRadius
        });
    }

    grow() {
        $('.shape').css({
            "width": "+= 100%",
            "height": "+= 100%"
        })
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function init() {
    let shapes = [];
    let classNames = ["circle", "rectangle", "triangle"];
    let className = classNames[Math.floor(Math.random() * classNames.length)];

    for (let i = 0; i < 5; i++) {
        shapes[i] = new Shape(getRandomInt(0, 500), getRandomInt(0, 500), getRandomInt(0, 500), getRandomInt(0, 500), className);
    }

    $(window).scroll(function() {
        for (let i = 0; i < shapes.length; i++) {
            shapes[i].display();
            shapes[i].grow();
        }
    });
}

$(document).ready(init);