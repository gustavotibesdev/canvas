// Getting canvas, and difining context

const cnv = document.querySelector("canvas")
const ctx = cnv.getContext("2d")


// Game State (Game screens)

const start = 1, play = 2
let gameState = start

//  Sounds 

const song = new Audio()
song.src = "sounds/song.mp3"

function playSong() {
    song.play()
}

// Defining obj

const player = {
    srcX: 0,
    srcY: 0,
    posX: 0,
    posY: 0,
    width: 24,
    height: 32,
    direction: "",
    speed: 5,
    src: "img/img.png",
    visible: false,
}

const msgStartGame = {
    text: "Click to play!",
    font: "bold 20px Sans-serif",
    color: "blue",
    srcX: 100,
    srcY: cnv.height / 2 - 50,
    visible: true
}

const playerSprite = new Image()
playerSprite.src = player.src

// Functions 

// Start

const writeMsgStartGame = () => {
    if (msgStartGame.visible) {
        ctx.fillStyle = msgStartGame.color
        ctx.font = msgStartGame.font
        ctx.fillText(msgStartGame.text,msgStartGame.srcX,msgStartGame.srcY)
    }
    else {
        ctx.clearRect(0,0,cnv.width,cnv.height)
    }
}
    
// Play

const drawPlayer = () => {
    if (player.visible) {
        ctx.drawImage(playerSprite,player.srcX,player.srcY,player.width,player.height,player.posX,player.posY,player.width,player.height)
    }
}

// Loop

const gameLoop = () => {
    playSong()
    writeMsgStartGame()
    drawPlayer()
    setTimeout(() => {
        gameLoop()
    }, 100);
}

gameLoop()

// Events 

document.addEventListener("mousedown", () => {
    if (gameState === start) {
        gameState = play
        msgStartGame.visible = false
        player.visible = true
    }
})

document.addEventListener("keydown", () => {
    switch (player.direction) {
        case "up":
            player.srcY -= player.speed
            break;
        case "down":
            player.srcY += player.speed
            break;
        case "right":
            player.srcX += player.speed
            break;
        case "left":
            player.srcX -+ player.speed
            break;
    }
})