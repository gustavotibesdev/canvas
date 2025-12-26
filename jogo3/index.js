// Getting canvas, and defining rendering context

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

// Sounds

const song = new Audio()
const dialogue = new Audio()
const urls = ["sounds/mainsound.mp3","sounds/talking.mp3"]
song.src = urls[0]
dialogue.src = urls[1]

function playSong() {
    song.play()
}

function stopSong() {
    song.pause()
    song.currentTime = 0
}

function playDialogue() {
    dialogue.play()
}

function stopDialogue() {
    dialogue.pause()
    dialogue.currentTime = 0
}

// Obj e class

class Character {
    constructor(srcX,srcY,width,height,posX,posY,src,speed,direction) {
        this.srcX = srcX
        this.srcY = srcY
        this.width = width
        this.height = height
        this.posX = posX
        this.posY = posY
        this.src = src
        this.speed = speed
        this.direction = direction
    }
}

const player = new Character(0,0,24,32,170,0,"img/img.png",5,"")
const sprite = new Image()
const scene = new Image()
const enemy = new Character(100,100,23,23,0,0,"img/enemy.png",0,null)
const enemyImage = new Image()
let countAnim = 0

// Functions

const cleanCanvas = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height)
}

const drawScene = () => {
    scene.src = "img/scene.png"
    ctx.drawImage(scene,0,0,canvas.width,canvas.height)
}

const drawPlayer = () => {
    sprite.src = player.src
    ctx.drawImage(sprite,player.srcX,player.srcY,player.width,player.height,player.posX,player.posY,player.width,player.height)
    animaPlayer()
}

const animaPlayer = () => {
    if (player.direction == "up" || player.direction == "down" || player.direction == "right" || player.direction == "left") {
        countAnim+=3
        if ( countAnim >= 40) {
            countAnim = 0
        }
        player.srcX = Math.floor(countAnim / 5) * player.width
    }
}

const drawEnemy = () => {
    enemyImage.src = enemy.src
    ctx.drawImage(enemyImage,enemy.srcX,enemy.srcY,enemy.width,enemy.height)
}

const movePlayer = () => {
    switch (player.direction) {
        case "up":
            player.posY -= player.speed
            player.srcY = player.height * 1
            break;
        case "down":
            player.posY += player.speed
            player.srcY = player.height * 0
            break;
        case "right":
            player.posX += player.speed
            player.srcY = player.height * 3
            break;
        case "left":
            player.posX -= player.speed
            player.srcY = player.height * 2
            break;
    }
    player.posX = Math.max(0,Math.min(canvas.width - player.width, player.posX))
    player.posY = Math.max(0,Math.min(canvas.height - player.height, player.posY))
}

const colision = () => {
    if (player.posX + player.width >= enemy.srcX && player.posX <= enemy.srcX + enemy.width - 15 && player.posY <= enemy.srcY + enemy.height - 25 && player.posY + player.height - 25 >= enemy.srcY) {
        stopSong()
        playDialogue()
        window.alert("Hi! my name is AngryHeart, I'm angry because I'm not as healthy as you.")
    }
}

const gameLoop = () => {
    playSong()
    cleanCanvas()
    drawScene()
    drawPlayer()
    drawEnemy()
    movePlayer()
    colision()
    setTimeout(() => {
        gameLoop()
    }, 100)
}

gameLoop()

// Events

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