const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

class Chracter {
    constructor(positionX,positionY,height,width,speed,src) {
        this.positionX = positionX
        this.positionY = positionY
        this.height = height
        this.width = width
        this.speed = speed
        this.src = src
    }
}

const player = new Chracter(0,0,100,60,5,"img/link.png")
const enemy = new Chracter(100,100,70,80,0,"img/enemy.png")
const canvasHeight = 500
const canvasWidth = 500
let direction

const cleanCanvas = () => {
    ctx.clearRect(0,0,canvasWidth,canvasHeight)
}

const drawPlayer = () => {
    let zenda = new Image()
    zenda.src = player.src
    zenda.onload = () => {
        ctx.drawImage(zenda,player.positionX,player.positionY,player.height,player.width)
    }
}

const drawEnemy = () => {
    let angryHeart = new Image()
    angryHeart.src = enemy.src
    angryHeart.onload = () => {
        ctx.drawImage(angryHeart,enemy.positionX,enemy.positionY,enemy.height,enemy.width)
    }
}

const colision = () => {
    if (player.positionX + player.width >= enemy.positionX && player.positionX <= enemy.positionX + enemy.width && player.positionY + player.height >= enemy.positionY && player.positionY <= enemy.positionY + enemy.height) {
        alert("colision")
    }
}

const movePlayer = () => {
    switch (direction) {
        case "Up":
            player.positionY -= player.speed
            break;
        case "Down":
            player.positionY += player.speed
            break;
        case "Right":
            player.positionX += player.speed
            break;
        case "Left":
            player.positionX -=player.speed
            break;
        
    }
}

const gameLoop = () => {
    drawPlayer()
    drawEnemy()
    movePlayer()
    // colision()
    cleanCanvas()
    setTimeout(() => {
        gameLoop()
    },100)
}

gameLoop()

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "w":
            direction = "Up"
            break;
        case "s":
            direction = "Down"
            break;
        case "d":
            direction = "Right"
            break;
        case "a":
            direction = "Left"
            break;
    }
})

document.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "w":
            direction = " "
            break;
        case "s":
            direction = " "
            break;
        case "d":
            direction = " "
            break;
        case "a":
            direction = " "
            break;
    }
})