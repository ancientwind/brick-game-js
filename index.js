var canvas
var ctx
var ballImage
var barImage

var barPositionX = 100

var bar = {
    width: 120,
    height: 20,
    speed: 1,
    posX: 100,
    posY: 260,
}

var ball = {
    width: 30,
    height: 30,
    speed: 2,
    posX: 100,
    posY: 150,
}

function initCtx() {
    canvas = document.getElementById('myGame')
    if (canvas) {
        ctx = canvas.getContext('2d')
    }
}

var _drawImage = function (obj, posX, posY) {
    if (ctx) {
        ctx.drawImage(obj, posX, posY, ball.width, ball.height)
    }
};
function initBall() {
    ballImage = new Image()
    ballImage.onload = function() {
        _drawImage(ballImage, ball.posX, ball.posY);
    }
    ballImage.src = 'img/ball.png'
}

function initBar() {
    barImage = new Image()
    barImage.onload = function() {
        _drawImage(barImage, bar.posX, bar.posY)
    }
    barImage.src = 'img/bar.jpeg'    
}

function bindKeyMove() {
    window.addEventListener('keydown', function(event) {
        if (event.key === 'a') {
            moveLeft()
        }
        else if (event.key === 'd') {
            moveRight()
        }
    })
}

function clearBar() {
    ctx.clearRect(0, 260, canvas.width, bar.height)
}
function moveLeft() {
    clearBar()
    _drawImage(barImage, --bar.posX, bar.posY)
    _log('move left' + bar.posX)
}

function moveRight() {
    _log('move right')
}

function _log(text) {
    console.log(text)
}

initCtx()
initBall()
initBar()
bindKeyMove()

