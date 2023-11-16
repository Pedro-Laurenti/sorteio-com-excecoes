var partNum = 100;
//particle number - change it!

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function between(min, max) {
    return Math.random() * (max - min) + min;
}

var c = document.getElementById('c');
var ctx = c.getContext('2d');
//context and id of canvas

var w = window.innerWidth;
var h = window.innerHeight;
//width and height of canvas

c.width = w;
c.height = h;
//setting the width and height for canvas

var mouse = {
    x: w / 2,
    y: h / 2
};
//mouse position

document.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX || e.pageX;
    mouse.y = e.clientY || e.pageY
}, false);
//finding the mouse position

var particles = [];
for (i = 0; i < partNum; i++) {
    particles.push(new particle);
}

//the particle function
function particle() {
    this.x = between(c.width / 2 - 150, c.width / 2 + 150);
    this.y = between(c.height / 2 - 150, c.height / 2 + 150);
    //setting the mouse position to the particle x and y


    this.vx = Math.random() * 6 - 3;
    this.vy = Math.random() * 4 - 2;
    //random velocity

    this.r = 2;
    //random radius

    this.color = '#fff';
    //only random colors of the variables
}

function draw() {
    requestAnimFrame(draw)

    ctx.fillStyle = '#010209';
    ctx.fillRect(0, 0, c.width, c.height)

    for (t = 0; t < particles.length; t++) {
        var p = particles[t];

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.r, Math.PI * 2, false);
        ctx.fill();
        //the context of the particle(s)

        p.x += p.vx;
        p.y += p.vy;
        //setting velocities

        p.vx;
        p.vy;

        if (p.y < 0) {
            p.vy *= -1;
        }

        if (p.y > c.height) {
            p.vy *= -1;
        }

        if (p.x < 0) {
            p.vx *= -1;
        }

        if (p.x > c.width) {
            p.vx *= -1;
        }

        for (j = 0; j < particles.length; j++) {
            var pp = particles[j];
            distance(p, pp);
        }
    }
}

function distance(p1, p2) {
    var dist,
        dx = p1.x - p2.x,
        dy = p1.y - p2.y;

    dist = Math.sqrt(dx * dx + dy * dy);

    // Draw the line when distance is smaller
    // then the minimum distance
    var minDist = 30;

    if (dist <= minDist) {

        // Draw the line
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,255,255," + (1.2 - dist / minDist) + ")";
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.closePath();


        var ax = dx / 2500,
            ay = dy / 2500;
        // Some acceleration for the partcles 
        // depending upon their distance

        p1.vx -= ax;
        p1.vy -= ay;

        p2.vx += ax;
        p2.vy += ay;
        // Apply the acceleration on the particles

        p1.r = 3;
        p2.r = 3;

        if (p1.r > 7) {
            p1.r = 7;
        }
        if (p2.r > 7) {
            p2.r = 7;
        }

    } else {
        p1.r = 1.5;
        p2.r = 1.5;
    }
}

draw();