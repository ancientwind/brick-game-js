var canvas
var ctx
var ballImage
var barImage

var _image = function(path) {
    var image = new Image()
    image.src = path
    return image
}

var _drawImage = function (objImage, obj) {
    if (ctx) {
        ctx.drawImage(objImage, obj.posX, obj.posY, obj.width, obj.height)
    }
};

var Bar = function() {

    var o = {
        width: 120,
        height: 20,
        speed: 10,
        posX: 100,
        posY: 270,        
    }

    o.image = _image('img/bar.jpeg')

    return o
}

var Ball = function() {

    var o = {
        width: 30,
        height: 30,
        speed: 5,
        posX: 100,
        posY: 150,
    }

    o.image = _image('img/ball.png')

    o.getCenterX = function() { return (o.posX + o.width/2) }

    return o

}

var Game = function() {
    var canvas = document.getElementById('myGame')
    var ctx
    if (canvas) {
        ctx = canvas.getContext('2d')
    }
    var g = {}

    g.init = function() {
        
    }

    return g
}

var _main = function() {

    var game = Game()
    var bar = Bar()
    var ball = Ball()

}

var bar = {
    width: 120,
    height: 20,
    speed: 10,
    posX: 100,
    posY: 270,
}

var ball = {
    width: 30,
    height: 30,
    speed: 5,
    posX: 100,
    posY: 150,
    getCenterX: function() { return (this.posX + this.width/2) }
}

// for bar move
var isKeydown = false
var idIntervalBar

// for ball move
var idIntervalBall
var moveToLeft = true
var moveToUp = true

function initCtx() {
    canvas = document.getElementById('myGame')
    if (canvas) {
        ctx = canvas.getContext('2d')
    }
}



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

function moveBall() {
    idIntervalBall = window.setInterval( function() {
        updateBallPos()
        reDrawBall()
    }, 1000/45)
}

function updateBallPos() {
    // update pos x
    if (moveToLeft) {
        if (ball.posX <= 0) { 
            moveToLeft = false 
            ball.posX = 0
        }
        else {
            ball.posX -= ball.speed
        }
    }
    else {
        if (ball.posX >= canvas.width - ball.width) { 
            moveToLeft = true 
            ball.posX = canvas.width - ball.width
        }
        else {
            ball.posX += ball.speed
        }
    }

    // update pos y
    if (moveToUp) {
        if (ball.posY <= 0) {
            moveToUp = false
            ball.posY = 0
        }
        else {
            ball.posY -= ball.speed
        }
    }
    else {
        if (ball.posY >= bar.posY - ball.height) {
            moveToUp = true
            ball.posY = bar.posY - ball.height
            if (!isBarTouchedBall()) {
                window.clearInterval(idIntervalBall)
            } 
        }
        else {
            ball.posY += ball.speed
        }
    }

}

function isBarTouchedBall(){

    _log('ball center x: ' + ball.getCenterX())
    // ball.posX in [bar.posX, bar.posX+bar.width]
    if ( ball.getCenterX() >= bar.posX && ball.getCenterX() <= bar.posX + bar.width) {
        return true
    }
    // ball.posY = bar.posY , no need for this step as this function is only called when reach pos y condition

    return false
}

function reDrawBall() {
    ctx.clearRect(0,0,canvas.width, bar.posY)
    _drawImage(ballImage, ball)
}

function bindKeyMove() {

    window.addEventListener('keydown', function(event) {
        if (!isKeydown) {
            isKeydown = true
            idIntervalBar = window.setInterval(function() {
                moveBar(event.key) }, 1000/45) 
        }
    })

    window.addEventListener('keyup', function() {
        window.clearInterval(idIntervalBar)
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

function _init() {
    initCtx()
    initBall()
    initBar()
}

function _run() {
    bindKeyMove()
    moveBall()
}

