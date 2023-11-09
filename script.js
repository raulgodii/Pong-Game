var ball;
var svg;
var p1;
var p2;

var p1Bar;
var p2Bar;

var widthSVG = 0;
var heightSVG = 0;

var widthBox = 0;
var heightBox = 0;

var velX = 10;
var velY = 8;



window.onload = () => {
    ball = document.getElementById("ball");
    svg = document.getElementById("svg");4
    box = document.getElementById("box");

    p1 = document.getElementById("player1"); // Text
    p2 = document.getElementById("player2"); // Text

    p1Bar = document.getElementById("p1Bar");
    p2Bar = document.getElementById("p2Bar");

    document.addEventListener("mousemove", moveBar);
    
    window.requestAnimationFrame(principalLoop);
}

// Controll of the program
function principalLoop(){
    widthSVG = svg.getBoundingClientRect().width;
    heightSVG = svg.getBoundingClientRect().height;

    widthBox = box.getBoundingClientRect().width;
    heightBox = box.getBoundingClientRect().height;

    setWindowDim();
    moveBall();
    moveBotBar();
    checkCrashP1();
    checkCrashP2();
    window.requestAnimationFrame(principalLoop);
}

// Moves the ball
function moveBall(){
    let x = parseInt(ball.getAttribute("x"));
    let y = parseInt(ball.getAttribute("y"));

    // Move X
    if(x+velX > widthBox || x+velX < 10){
        velX *= -1;
    } else {
        ball.setAttribute("x", x+velX);
    }

    // Move Y
    if(y+velY > heightBox || y+velY < 10){
        velY *= -1;
    } else {
        ball.setAttribute("y", y+velY);
    }
}

// Asign dinamic positions to the text of Players and the Box rectangle
function setWindowDim(){

    p1.setAttribute("x", widthSVG/2 - (p1.getBoundingClientRect().width)-20);
    p2.setAttribute("x", widthSVG/2 + 20);

    box.setAttribute("width", widthSVG-20);
    box.setAttribute("height", heightSVG-20);

    p2Bar.setAttribute("x", widthSVG-25-25);
}

// Moves the bar of the player with the mouse
function moveBar(e){
    var mouseY = e.clientY;

    // Obtiene la posición vertical del centro de la barra
    var barCenterY = mouseY - p1Bar.getBoundingClientRect().height / 2;

    // Limita la posición de la barra para que no se salga del área del juego
    if(e.clientY < (p1Bar.getBoundingClientRect().height/2)+10){
        p1Bar.setAttribute("y", 10);
    }
    else if(e.clientY > (heightSVG-(p1Bar.getBoundingClientRect().height/2)-10)){
        p1Bar.setAttribute("y", heightBox-p1Bar.getBoundingClientRect().height+10);
    }else{
        p1Bar.setAttribute("y", barCenterY);
    }
}

// Moves the bar with a small "AI" like a bot
function moveBotBar(){
    let centerBallY = parseFloat(ball.getAttribute("y"))+(15/2);

    // Limita la posición de la barra para que no se salga del área del juego

    if(centerBallY < (p2Bar.getBoundingClientRect().height/2)+10){
        p2Bar.setAttribute("y", 10);
    }
    else if(centerBallY > (heightSVG-(p2Bar.getBoundingClientRect().height/2)-10)){
        p2Bar.setAttribute("y", heightSVG-120-10);
    }else{
        p2Bar.setAttribute("y", centerBallY-60);
    }
}

// Check if the Ball crash with the Bar1 in the TWO corners of the square
function checkCrashP1(){
    // Heigth Ball: 15px
    // Widht Ball: 15px

    // Width Bar: 25px
    // Height Bar: 120px
    // Distance Bar from the side; 25px

    if((parseInt(ball.getAttribute("x"))<(25+25)) && ( (parseInt(ball.getAttribute("y"))>parseInt(p1Bar.getAttribute("y")))&&(parseInt(ball.getAttribute("y"))<(parseInt(p1Bar.getAttribute("y"))+120)) || (parseInt(ball.getAttribute("y"))+15>parseInt(p1Bar.getAttribute("y")))&&(parseInt(ball.getAttribute("y"))+15<(parseInt(p1Bar.getAttribute("y"))+120)))){
        velX *= -1;
    }
}

// Check if the Ball crash with the Bar2 in the TWO corners of the square
function checkCrashP2(){
    // Heigth Ball: 15px
    // Widht Ball: 15px

    // Width Bar: 25px
    // Height Bar: 120px
    // Distance Bar from the side; 25px

    if( ((parseInt(ball.getAttribute("x"))+15) > (widthSVG-50)) && ( ( (parseInt(ball.getAttribute("y")) > parseInt(p2Bar.getAttribute("y"))) && (parseInt(ball.getAttribute("y")) < parseInt(p2Bar.getAttribute("y"))+120 )) || ( (parseInt(ball.getAttribute("y")+15) > parseInt(p2Bar.getAttribute("y"))) && (parseInt(ball.getAttribute("y")+15) < parseInt(p2Bar.getAttribute("y"))+120 )) ) ){
        velX *= -1;
    }
}