var canvas
var ctx
var ballImage
var barImage

var bar = {
    width: 120,
    height: 20,
    speed: 10,
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

var isKeydown = false
var idInterval

function initCtx() {
    canvas = document.getElementById('myGame')
    if (canvas) {
        ctx = canvas.getContext('2d')
    }
}

var _drawImage = function (objImage, obj) {
    if (ctx) {
        ctx.drawImage(objImage, obj.posX, obj.posY, obj.width, obj.height)
    }
};

function initBall() {
    ballImage = new Image()
    ballImage.onload = function() {
        _drawImage(ballImage, ball);
    }
    ballImage.src = 'img/ball.png'
}

function initBar() {
    barImage = new Image()
    barImage.onload = function() {
        _drawImage(barImage, bar)
    }
    barImage.src = 'img/bar.jpeg'    
}

function bindKeyMove() {
    window.addEventListener('keydown', function(event) {
        if (!isKeydown) {
            isKeydown = true
            idInterval = window.setInterval(function() {
                moveBar(event.key) }, 1000/30) 
        }
    })

    window.addEventListener('keyup', function() {
        window.clearInterval(idInterval)
        isKeydown = false
    })
}

function moveBar(key) {
    updateBarPos(key)
    reDrawBar()
}

function clearBar() {
    ctx.clearRect(0, bar.posY, canvas.width, bar.height)
}

function updateBarPos(key) {
    if ( key === 'a' ) {
        if ( bar.posX > 0 ) { 
            bar.posX -= bar.speed  
        }
    }
    else if ( key === 'd') {
        if ( bar.posX < canvas.width - bar.width) { 
            bar.posX += bar.speed 
        }
    }
}

function reDrawBar() {
    clearBar()
    _drawImage(barImage, bar)
    _log('bar move left' + bar.posX)
}

function _log(text) {
    console.log(text)
}

initCtx()
initBall()
initBar()
bindKeyMove()

