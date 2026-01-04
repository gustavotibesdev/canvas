// Getting canvas, and defining rendering context

const cnv = document.querySelector("canvas")
const ctx = cnv.getContext("2d")

// Generate random number (posX,posY)

const ramdomNumber = (max,min) => { return Math.floor(Math.random() * (max - min) + min) } 

// Obj 

class Character {
    constructor(posX,posY,width,height,color) {
        this.posX = posX
        this.posY = posY
        this.width = width
        this.height = height
        this.color = color
    }

    draw(ctx) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.posX,this.posY,this.width,this.height)
    }
}

const player = new Character(0,0,50,50,"blue")
const enemy =  new Character(ramdomNumber(cnv.width - 25,0),ramdomNumber(cnv.height - 25,0),25,25,"red")

const drawCharacters = () => {
    player.draw(ctx)
    enemy.draw(ctx)
}

// Loop 

const gameLoop = () => {
    drawCharacters()
    setTimeout(() => {
        gameLoop()
    }, 100);
}

gameLoop()