const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const size = 50
const cnvWidth = 500
const cnvHeight = 500
let speed = 3


const player = {
    x: 0,
    y: 0
} 

const enemy = {
    x: 250,
    y: 200,
}

const drawPlayer = () => {
    ctx.fillStyle = "red"
    ctx.fillRect(player.x,player.y,size,size)
} 

const drawEnemy = () => {
    ctx.fillStyle = "black"
    ctx.fillRect(enemy.x,enemy.y,size,size)
}

const clearPlayer = () => {
    ctx.clearRect(player.x,player.y,size,size)
}

const colision = () => {
    if (player.x + size >= enemy.x && player.x <= enemy.x + size && player.y + size >= enemy.y && player.y <= enemy.y + size) {
        ctx.fillStyle = "green"
        ctx.fillRect(player.x,player.y,size,size)
        return true
    }
    if (player.x <= 0 || player.x + size >= cnvWidth || player.y <= 0 || player.y + size >= cnvHeight) {
        ctx.fillStyle = "green"
        ctx.fillRect(player.x,player.y,size,size)
        return true
    }
    else {
        ctx.fillStyle = "red"
        ctx.fillRect(player.x,player.y,size,size)
        return false
    }
}

const loopGame = () => {
    drawPlayer()
    drawEnemy()
    colision()
    setTimeout(() => {
        loopGame()
    },1000)
}

loopGame()

document.addEventListener("keydown",(e) => {
switch (e.key) {
    case "w":
        clearPlayer()
        player.y-=speed
        if (!colision()) {
            drawPlayer()
        }
        break;
    case "s":
        clearPlayer()
        player.y+=speed
        if (!colision()){
            drawPlayer()
        }
        break;
    case "d":
        clearPlayer()
        player.x+=speed
         if (!colision()) {
            drawPlayer()
        }
        break;
    case "a":
        clearPlayer()
        player.x-=speed
        if (!colision()){
            drawPlayer()
        }
        break;
    }
})



