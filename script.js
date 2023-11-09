var ball;
var svg;
var p1;
var p2;

var line;

var p1Bar;
var p2Bar;

var widthSVG = 0;
var heightSVG = 0;

var widthBox = 0;
var heightBox = 0;

var velX = 10;
var velY = 8;

var lose;
var start;
var restart;
var cont;
var result;
var record;
var title;

window.onload = () => {
    ball = document.getElementById("ball");
    svg = document.getElementById("svg");4
    box = document.getElementById("box");

    p1 = document.getElementById("player1"); // Text
    p2 = document.getElementById("player2"); // Text

    p1Bar = document.getElementById("p1Bar");
    p2Bar = document.getElementById("p2Bar");

    line = document.getElementById("line");

    lose = document.getElementById("lose");
    start = document.getElementById("start");
    restart = document.getElementById("restart");
    cont = document.getElementById("cont");
    result = document.getElementById("result");
    record = document.getElementById("record");

    title = document.getElementById("title");

    document.addEventListener("mousemove", moveBar);

    p1Bar.style.display = "none";
    p2Bar.style.display = "none";
    ball.style.display = "none";
    line.style.display = "none";
    p1.style.display = "none";
    p2.style.display = "none";
    lose.style.display = "none";
    start.style.display = "block";
    restart.style.display = "none";
    cont.style.display = "none";
    result.style.display = "none";
    record.style.display = "none";

    setWindowDim();

    start.addEventListener('click', ()=>{
        restartGame();
        window.requestAnimationFrame(principalLoop);
    });
}

// Start the Game
function restartGame(){
    ball.setAttribute("x", widthSVG/2);

    velX = 10;
    velY = 8;
    cont.innerHTML = "0";

    title.style.display = "none";
    p1Bar.style.display = "block";
    p2Bar.style.display = "block";
    ball.style.display = "block";
    line.style.display = "block";
    p1.style.display = "block";
    p2.style.display = "block";
    lose.style.display = "none";
    cont.style.display = "block";
    start.style.display = "none";
    restart.style.display = "none";
    result.style.display = "none";
    record.style.display = "none";
}

// Controll of the program
function principalLoop(){

    setWindowDim();
    moveBall();
    moveBotBar();
    checkCrashP1();
    checkCrashP2();
    checkBallOut();

    window.requestAnimationFrame(principalLoop);
}

// Moves the ball
function moveBall(){
    let x = parseInt(ball.getAttribute("x"));
    let y = parseInt(ball.getAttribute("y"));

    // Move X
    if(x+velX > widthBox){
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

// Asign dinamic positions to the text of Players, the Box rectangle, and Lose Text
function setWindowDim(){

    widthSVG = svg.getBoundingClientRect().width;
    heightSVG = svg.getBoundingClientRect().height;

    widthBox = box.getBoundingClientRect().width;
    heightBox = box.getBoundingClientRect().height;

    p1.setAttribute("x", widthSVG/2 - (p1.getBoundingClientRect().width)-20);
    p2.setAttribute("x", widthSVG/2 + 20);
    cont.setAttribute("x", widthSVG/2 - (p1.getBoundingClientRect().width/2)-20);

    box.setAttribute("width", widthSVG-20);
    box.setAttribute("height", heightSVG-20);

    p2Bar.setAttribute("x", widthSVG-25-25);

    widthLose = lose.getBoundingClientRect().width;
    lose.setAttribute("x", ((parseInt(widthSVG)/2)-(parseInt(widthLose)/2)));
    lose.setAttribute("y", (parseInt(heightSVG)/2)-20);

    widthStart = start.getBoundingClientRect().width;
    start.setAttribute("x", ((parseInt(widthSVG)/2)-(parseInt(widthStart)/2)));
    start.setAttribute("y", (parseInt(heightSVG)/2)+50);

    widthRestart = restart.getBoundingClientRect().width;
    restart.setAttribute("x", ((parseInt(widthSVG)/2)-(parseInt(widthRestart)/2)));
    restart.setAttribute("y", (parseInt(heightSVG)/2)+20);

    widthResult = result.getBoundingClientRect().width;
    result.setAttribute("x", ((parseInt(widthSVG)/2)-(parseInt(widthResult)/2)));

    widthRecord = record.getBoundingClientRect().width;
    record.setAttribute("x", ((parseInt(widthSVG)/2)-(parseInt(widthRecord)/2)));
    record.setAttribute("y", (parseInt(heightSVG)-20));

    widthTitle = title.getBoundingClientRect().width;
    title.setAttribute("x", ((parseInt(widthSVG)/2)-(parseInt(widthTitle)/2)));
    title.setAttribute("y", (parseInt(heightSVG)/2)-50);
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
        if(velX!=0 && velY!=0){
            cont.innerHTML= (parseInt(cont.innerHTML)+1);
        }
        if(velX<0){
            velX = (velX-2)*-1;
        }else{
            velX = (velX+2)*-1; 
        }
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

// Check if the Ball is Out of the field
function checkBallOut(){
    
    if((ball.getAttribute("x")<10) || ball.getAttribute("x")>widthSVG-10){
        endGame();
    }
}

function endGame(){
    velX=0;
    velY=0;

    if(readCookie("record") != null){

        if(readCookie("record")<parseInt(cont.innerHTML)) setCookie("record", parseInt(cont.innerHTML));

        record.innerHTML = "Your Personal Record: " + readCookie("record");
        record.style.display = "block";
    } else {
        setCookie("record", parseInt(cont.innerHTML));
    }

    result.innerHTML = ("Result: " + parseInt(cont.innerHTML));
    p1Bar.style.display = "none";
    p2Bar.style.display = "none";
    ball.style.display = "none";
    line.style.display = "none";
    p1.style.display = "none";
    p2.style.display = "none";
    restart.style.display = "none";
    cont.style.display = "none";
    lose.style.display = "block";
    restart.style.display = "block";
    result.style.display = "block";
}


function setCookie(id,val){
    let date = new Date();

    document.cookie = id+"="+val;
}

function readCookie(id){
    let arrayCookie = document.cookie.split(";");

    for (let cookie of arrayCookie) {
        let splitCookie = cookie.trim().split("=");
        if (splitCookie[0] === id) {
            return splitCookie[1];
        }
    }

    return null;
}

function deleteCookie(id){
    if(readCookie(id)!=null){
        document.cookie = id + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        return true;
    }
    return false;
}