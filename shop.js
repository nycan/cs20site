var canvas;
var ax, bx, cx;
var ay, by, cy;
var sides, area;
const width = 500;
const height = 500;
const min_angle_cosine = -0.95;
var cc = document.getElementById("canvas");
cc.style.width = width;
cc.style.height = height;
canvas = cc.getContext("2d");

// Populates the variables
// Returns 1 iff the triangle was successfully created
function createTriangle(){
    // Stupidest code i've ever written
    // Randomly choose points in the window
    ax = Math.floor(Math.random()*width);
    bx = Math.floor(Math.random()*width);
    cx = Math.floor(Math.random()*width);
    ay = Math.floor(Math.random()*height);
    by = Math.floor(Math.random()*height);
    cy = Math.floor(Math.random()*height);

    // Calculate the area using Heron's formula
    area = Math.abs(ax*by+bx*cy+cx*ay-(ay*bx+by*cx+cy*ax))/2;

    // Restrict area
    if(area < 500 || area > 7500){
        return 0;
    }

    // Calculate side lengths with Pythagorean theorem
    sides = Array(
        Math.sqrt((cx-bx)*(cx-bx)+(cy-by)*(cy-by)),
        Math.sqrt((ax-cx)*(ax-cx)+(ay-cy)*(ay-cy)),
        Math.sqrt((bx-ax)*(bx-ax)+(by-ay)*(by-ay))
    );

    // Restrict max angle
    for(var i = 0; i<3; ++i){
        // Calculate angle cosines with cosine law
        var angle = (sides[i]*sides[i]-sides[(i+1)%3]*sides[(i+1)%3]-sides[(i+2)%3]*sides[(i+2)%3])/(2*sides[(i+1)%3]*sides[(i+2)%3]);
        if(angle < min_angle_cosine){
            return 0;
        }
    }
    return 1;
}

function drawTriangle(){
    canvas.moveTo(ax,ay);
    canvas.lineTo(bx,by);
    canvas.lineTo(cx,cy);
    canvas.lineTo(ax,ay);
    canvas.stroke();
}

function newTriangle(){
    document.getElementById("buy-alert").innerHTML = "";
    canvas.clearRect(0, 0, width, height);
    canvas.beginPath();
    while(!createTriangle());
    drawTriangle();
}

function showStock(){
    document.getElementById("buy-alert").innerHTML = "Sorry, this product is currently out of stock.";
}

newTriangle();