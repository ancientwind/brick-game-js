var ctx = document.getElementById('myGame').getContext('2d')

function initBall() {
    var ballImage = new Image()
    ballImage.onload = function() {
        if (ctx) {
            ctx.drawImage(ballImage, 100, 150, 30, 30)
        }
    
    }
    ballImage.src = 'img/ball.png'
}

function initBar() {
    var barImage = new Image()
    barImage.onload = function() {
        if (ctx) {
            ctx.drawImage(barImage, 50, 260, 120, 20)
        }
    
    }
    barImage.src = 'img/bar.jpeg'    
}

function moveLeft() {
    var event = window.event
    _log(event) 
}

function moveRight() {

}

function _log(text) {
    console.log(text)
}

initBall()
initBar()

window.addEventListener('keydown', function(event) {
    _log('key pressed')
    _log(event.key)
})