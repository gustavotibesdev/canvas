// Getting html tags

const $h1 = document.querySelector("h1")

// Getting canvas, and defing rendering context

const cnv = document.querySelector("canvas")
const ctx = cnv.getContext("2d")

// Sounds 

const eatSound = new Audio()
eatSound.src = "sounds/eat.mp3"

// Random food position

const randomNumber = (max,min) => { return Math.floor(Math.random() * (max - min) + min)}  
const randomPosition = () => {
    const number = randomNumber(cnv.width - size, 0)
    return Math.round(number / 30) * 30
}

// Score 

let score = 0

function incrementScore () {
    ++score
    $h1.innerText = `Score ${score}`
}

// Defining variables

const size = 30
let direction = ""

const snake = [
    { x: 30, y: 60 },
    { x: 30 + size, y: 60 }
]

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: "red",
}

const msgGameOver = {
    text: "Game over",
    font: "bold 20px Sans-Serif",
    color: "red",
    x: (cnv.width / 2),
    y: (cnv.height / 2 - 100),
    visible: false,

    writeMsg(ctx) {
        ctx.fillStyle = this.color
        ctx.font = this.font
        ctx.fillText(this.text,this.x,this.y)
    }
}

// Play functions 

const cleanCanvas = () => { ctx.clearRect(0,0,cnv.width,cnv.height) }

const drawSnake = () => {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "green"
        ctx.fillRect(snake[i].x,snake[i].y,size,size)
    }
}

const drawFood = () => {
    ctx.fillStyle = food.color
    ctx.fillRect(food.x,food.y,size,size)
}

const moveSnake = () => {
    
    if (direction == "") {
        return
    }

    const head = snake[snake.length - 1]

    snake.shift()

    switch (direction) {
        case "up":
            snake.push({ x: head.x, y: head.y - size })
            break;
        case "down":
            snake.push({ x: head.x, y: head.y + size })
            break;
        case "right":
            snake.push({ x: head.x + size, y: head.y })
            break;
        case "left":
            snake.push({ x: head.x - size, y: head.y })
            break;
    }
}

const checkEat = () => {

    const head = snake[snake.length - 1]

    if (head.x == food.x && head.y == food.y) {     
        eatSound.play()
        snake.push(head)
        food.x, food.y = randomPosition()
        incrementScore()
    }
}

const checkColision = () => {

    const head = snake[snake.length - 1]

    if (head.x < 0 || head.x >= cnv.width || head.y < 0 || head.y >= cnv.height) {
        gameLost()
    }

}

// Game Over functions 

const gameLost = () => {
    msgGameOver.visible = true
    msgGameOver.writeMsg(ctx)
}

// Loop 

const gameLoop = () => {
    cleanCanvas()
    moveSnake()
    drawSnake() 
    drawFood()
    checkEat()
    checkColision()
    setTimeout(() => {
        gameLoop()
    }, 300);
}

gameLoop()

// Events

document.addEventListener("keydown", (e) => {

    if ( e.key == "w" && direction != "down" ) {
        direction = "up"
    }
    if ( e.key == "s" && direction != "up" ) {
        direction = "down"
    }
    if ( e.key == "d" && direction != "left" ) {
        direction = "right"
    }
    if ( e.key == "a" && direction != "right" ) {
        direction = "left"
    }

})
