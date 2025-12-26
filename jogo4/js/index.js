// Get element canvas, defining the context

const cnv = document.querySelector("canvas")
const ctx = cnv.getContext("2d")

// Game state (Game screen)

const start = 1, play = 2, gameOver = 3
let gameState = start

// Audios

const audioGameOver = new Audio()
const audioMain = new Audio()
const urls = ["sound/mainsound.mp3","sound/game-over-classic.mp3"]
audioMain.src = urls[0]
audioGameOver.src = urls[1]

function playSong() {
    audioMain.play()
}

function stopSong() {
    audioMain.pause()
    audioMain.currentTime = 0
}

function gameOverSound() {
    audioGameOver.play()
}

function stopGameOverSound() {
    audioGameOver.pause()
    audioGameOver.currentTime = 0
}

// Obj 

const player = {
    x: 10,
    y: 10,
    srcX: 10,
    srcY: 10,
    speed: 8,
    width: 50,
    height:50,
    color: "red",
    direction: ""
}

class Messages {
    constructor(text,font,color,x,y,visible) {
        this.text = text
        this.font = font
        this.color = color
        this.x = x 
        this.y = y 
        this.visible = visible
    }
}

const msgStartGame = new Messages("Click to play!","bold 20px Sans-Serif","green", 250, 250, true)
const msgGameOver = new Messages("Game Over","bold 20px Sans-Serif","red", 250, 250, false)

// Functions

const clearCanvas = () => {
    ctx.clearRect(0,0,cnv.width,cnv.height)
}

const startGame = () => {

    function WriteMsgStartGame() {
        if (msgStartGame.visible) {
            ctx.font = msgStartGame.font
            ctx.fillStyle = msgStartGame.color
            ctx.fillText(msgStartGame.text,msgStartGame.x,msgStartGame.y)
        }
        else {
            clearCanvas()
        }
    }

    WriteMsgStartGame()
}

const playGame = () => {

    function drawPlayer() {
        ctx.fillStyle = player.color
        ctx.fillRect(player.x,player.y,player.width,player.height)
    }

    function movePlayer() {
        switch (player.direction) {
            case "up":
                player.y -= player.speed
                break;
            case "down":
                player.y += player.speed
                break;
            case "right":
                player.x += player.speed
                break;
            case "left":
                 player.x -= player.speed
                break;
        }
    }

    function checkColision() {
        if (player.x <= cnv.width * 0 || player.x + player.width >= cnv.width || player.y <= cnv.height * 0 || player.y + player.height >= cnv.height) {
            gameState = gameOver
            msgGameOver.visible = true
        }  
    }

    playSong()
    drawPlayer()
    movePlayer()
    checkColision()
}

const GameOver = () => {

    function WriteMsgGameOver() {
        if (msgGameOver.visible) {
            ctx.font = msgGameOver.font
            ctx.fillStyle = msgGameOver.color
            ctx.fillText(msgGameOver.text,msgGameOver.x,msgGameOver.y)
        }
        else {
            clearCanvas()
        }
    }

    function resetPlayerPosition() {
        player.x = player.srcX
        player.y = player.srcY
    }

    WriteMsgGameOver()
    resetPlayerPosition()
    stopSong()
    gameOverSound()
}

const gameLoop = () => {
    clearCanvas()
    switch (gameState) {
        case start:
            startGame()
            break;
        case play:
            playGame()
            break;
        case gameOver:
            GameOver()
            break;
    }
    setTimeout(() => {
        gameLoop()
    },100)
}

gameLoop()

// Events

cnv.addEventListener("mousedown", () => {
    switch (gameState) {
        case start:
            gameState = play
            msgStartGame.visible = false
            startGame()
            break;
        case play:
            break;
        case gameOver:
            gameState = start
            msgGameOver.visible = false
            msgStartGame.visible = true
            GameOver()
            break; 
    }
})

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "w":
            player.direction = "up"
            break;
        case "s":
            player.direction = "down"
            break;
        case "d":
            player.direction = "right"
            break;
        case "a":
            player.direction = "left"
            break;
    }
})

document.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "w":
            player.direction = ""
            break;
        case "s":
            player.direction = ""
            break;
        case "d":
            player.direction = ""
            break;
        case "a":
            player.direction = ""
            break;
    }
})



