// Getting canvas, and defining rendering context

const cnv = document.querySelector("canvas")
const ctx = cnv.getContext("2d")

// Sounds 

const song = new Audio()
song.src = "sounds/song.mp3"

function playSong() {
    song.play()
}

// Game states (Game screens)

const start = 1, play = 2, gameOver = 3
let gameState = start

// Defining objects and classes

class Message {
    constructor(text,font,color,posX,posY,visible) {
        this.text = text
        this.font = font
        this.color = color
        this.posX = posX
        this.posY = posY
        this.visible = visible
    }

    writeMessage(ctx) {
        ctx.fillStyle = this.color
        ctx.font = this.font
        ctx.fillText(this.text,this.posX,this.posY)
    }
}

const msgStart = new Message("Click to play!","bold 20px Sans-Serif","green",(cnv.width / 2) - 70,(cnv.height / 2),true)
const msgGameOver = new Message("Game Over","bold 20px Sans-Serif","red",(cnv.width / 2) - 70,(cnv.height / 2),false)

const scene = {
    srcX: 0,
    srcY: 0,
    width: cnv.width,
    height: cnv.height,
    src: "img/scene.png",
    visible: false,

    drawScene(ctx,img) {
        ctx.drawImage(img,this.srcX,this.srcY,this.width,this.height)
    }
}

const player = {
    srcX: 0,
    srcY: 0,
    width: 24,
    height: 32,
    posX: 169,
    posY: 0,
    speed: 5,
    direction: "",
    src: "img/img.png",
    countAnim: 0,
    visible: false,

    drawPlayer(ctx,img) {
        ctx.drawImage(img,this.srcX,this.srcY,this.width,this.height,this.posX,this.posY,this.width,this.height)
        this.animaPlayer()
    },

    playerMovement() {
        switch (this.direction) {
        case "up":
            this.posY -= this.speed
            this.srcY = this.height * 1
            break;
        case "down":
            this.posY += this.speed
            this.srcY = this.height * 0
            break;
        case "right":
            this.posX += this.speed
            this.srcY = this.height * 3
            break;
        case "left":
            this.posX -= this.speed 
            this.srcY = this.height * 2
            break;
        }
    },

    animaPlayer() {
        if (this.direction == "up" || this.direction == "down" || this.direction == "right" || this.direction == "left") {
            this.countAnim+=5

            if (this.countAnim >= 40) {
                this.countAnim = 0
            }

            this.srcX = Math.floor(this.countAnim / 5) * this.width
        }
    },

    async Checkcolide() {
        // Border colision 
        if (this.posX < 0 || this.posX + this.width >= cnv.width || this.posY < 0 || this.posY + this.height >= cnv.height) {
            this.posX = Math.max(0,Math.min(cnv.width - this.width,this.posX))
            this.posY = Math.max(0,Math.min(cnv.height - this.height,this.posY))
        }
        // Npc colision 
        if (this.posX <= npc.posX + npc.width && this.posX + this.width >= npc.posX && this.posY + this.height >= npc.posY && this.posY <= npc.posY + npc.height) {
            npc.speak()
        }
    }

}

const npc = {
    srcX: 0,
    srcY: 0,
    width: 17,
    height: 30,
    posX: 20,
    posY: 100,
    visible: false,
    src: "img/npc17.png",

    drawNpc(ctx,img) {
        ctx.drawImage(img,this.srcX,this.srcY,this.width,this.height,this.posX,this.posY,this.width,this.height)
    },

    speak() {
        alert("Hi my name is Lucas...")
        alert("I really like this world!")
    }
}

const spriteSheet = new Image()
const imgScene = new Image()
const npcImg = new Image()
const src = [player.src,scene.src,npc.src]
spriteSheet.src = src[0]
imgScene.src = src[1]
npcImg.src = src[2]



// Functions

// Start

const writeMsgStart = () => {
    if (gameState == start) {
        if (msgStart.visible) {
            msgStart.writeMessage(ctx)
        }
    }
}

// Play

const drawBackground = () => {
    if (gameState == play) {
        if (scene.visible) {
            scene.drawScene(ctx,imgScene)
        }
    }
}

const drawChracters = () => {
    if (gameState == play) {
        if (player.visible && npc.visible) {
            player.drawPlayer(ctx,spriteSheet)
            npc.drawNpc(ctx,npcImg)
        }
    }
}

const movePlayer = () => {
    if (gameState == play) {
        player.playerMovement()
    }
}

const CheckColision = () => {
    if (gameState == play) {
        player.Checkcolide()
    }
}

// Game Over

const writeMsgGameOver = () => {
    if (gameState == gameOver) {
        if (msgGameOver.visible == true) {
            msgGameOver.writeMessage(ctx)
        }
    }
}

// Loop 

const gameLoop = () => {
    playSong()
    writeMsgStart()
    drawBackground()
    drawChracters()
    movePlayer()
    CheckColision()
    writeMsgGameOver()
    setTimeout(() => {
        gameLoop()
    }, 100)
}

gameLoop()

// Events 

document.addEventListener("mousedown", () => {
    switch (gameState) {
        case start:
            gameState = play
            msgStart.visible = false
            scene.visible = true
            player.visible = true
            npc.visible = true
            break;
        case gameOver:
            gameState = start
            msgGameOver.visible = false
            msgStart.visible = true
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