// Getting canvas, and defining context

const cnv = document.querySelector("canvas")
const ctx = cnv.getContext("2d")

// Sounds

const song = new Audio()
song.src = "sounds/mainsound.mp3"

const playSong = () => {
    song.play()
}

// Defining obj and class

class BackgroundElements {
    constructor(srcX,srcY,width,height,posX,posY,src) {
        this.srcX = srcX
        this.srcY =srcY
        this.width = width
        this.height = height
        this.posX = posX
        this.posY = posY
        this.src = src 
    }
}

const ground = new BackgroundElements(0,0,48,48,0,420 + 32,"img/scenario/tile32.png")
const groundImage = new Image()
groundImage.src = ground.src
const background = new BackgroundElements(0,0,cnv.width,cnv.height,0,0,"img/scenario/background.jpg")
const backgroundImage = new Image()
backgroundImage.src = background.src

let countAnim = 0

const player = {
    gravidade: 1,
    srcX: 0,
    srcY: 0,
    width: 32,
    height: 32,
    posX: 0,
    posY: 420,
    speed: 8,
    direction: "",
    src: "img/player/player.png",
}


const playerSprite = new Image()
playerSprite.src = player.src

// Main functions 

const drawBackground = () => {
    ctx.drawImage(backgroundImage,background.posX,background.posY,background.width,background.height)
}

const drawGround = () => {
    ctx.drawImage(groundImage,ground.srcX,ground.srcY,ground.width,ground.height,ground.posX,ground.posY,ground.width,ground.height)
}

const drawPlayer = () => {
    ctx.drawImage(playerSprite,player.srcX,player.srcY,player.width,player.height,player.posX,player.posY,player.width,player.height)
    animaPlayer()
}

const movePlayer = () => {
    switch (player.direction) {
        case "right":
            player.posX += player.speed
            break;
        case "left":
            player.posX -= player.speed
            break;
    }
    player.posX = Math.max(0,Math.min(cnv.width - player.width, player.posX))
}

const animaPlayer = () => {
    
    if (player.direction == "right" || player.direction == "left") {
        countAnim+=5

        if (countAnim >= 20) {
            countAnim = 5
        }
        player.srcX = Math.floor(countAnim / 5) * player.width
    }
}

const checkFall = () => {
    if (player.posX + 3 >= ground.posX + ground.width) {
        if (player.posY + player.height >= ground.posY) {
            player.posY += player.gravidade
        }
        if (player.posY >= ground.posY + ground.height) {
            alert("game over")
        }
    }
    if (player.posY + 26>= ground.posY) {
        player.posY += player.gravidade
        player.posX = Math.max(player.posX,ground.posX + ground.width)
    }
    if (player.posX + player.width == ground.posX) {
        alert("oi")
        player.posX = Math.max(player.posX,ground.posX)
    }
}

const jump = () => {
    player.posY -= 25
    setTimeout(() => {
        player.posY += 25
    }, 300)
}

// Loop

const gameLoop = () => {
    playSong()
    drawBackground()
    drawGround()
    drawPlayer()
    movePlayer()
    checkFall()
    setTimeout(() => {
        gameLoop()
    },100)
}

gameLoop()

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "a":
            player.direction = "left"
            break;
        case "d":
            player.direction = "right"
            break;
        case "Enter":
            jump()
            break;
    }
})

document.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "a":
            player.direction = ""
            break;
        case "d":
            player.direction = ""
            break;
    }
})