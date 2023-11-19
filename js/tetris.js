let currentPiece, nextPiece
let ctx
const canvas = document.getElementById('tetrisCanvas')
ctx = canvas.getContext('2d') // Inicialize ctx aqui

const PIECES = [
    {
        shape: [
            [2, 2, 2, 2]
        ],
        color: '#FF0000' // Cor original da peça
    },
    {
        shape:[
            [3]
        ],
        color: '#FFD700'
    },
    {
        shape:[
            [2, 2, 2],
            [0, 2, 0]
        ],
        color: '#00FF00'
    },
    {
        shape:[
            [2, 2, 2],
            [2, 0, 0]
        ],
        color: '#0000FF' 
    },
    {
        shape:[
            [2, 2, 2],
            [0, 0, 2]
        ],
        color: '#FFA500'
    },
    {
        shape:[
            [2, 2],
            [2, 2] 
        ],
        color: '#800080'
    },
    {
        shape:[
            [2, 2, 0],
            [0, 2, 2] 
        ],
        color: '#00FFFF'
    },
    {
        shape:[
            [0, 2, 2],
            [2, 2, 0]
        ],
        color: '#FF00FF'
    },
    {
        shape:[
            [2, 0, 2],
            [2, 2, 2]
        ],
        color: '#183E0C'
    }
]

var setavoltar = document.getElementById("seta-voltar")
setavoltar.style.display = "none"

function drawNextPiece(nextPiece) {
    const nextCanvas = document.getElementById('nextPieceCanvas')
    const ctx = nextCanvas.getContext('2d')
    ctx.clearRect(0, 0, nextCanvas.width, nextCanvas.height)

    const piece = nextPiece.piece
    const cellSize = 30 // Tamanho das células do canvas
    const xOffset = (nextCanvas.width - piece[0].length * cellSize) / 2
    const yOffset = (nextCanvas.height - piece.length * cellSize) / 2

    for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < piece[i].length; j++) {
            if (piece[i][j]) {
                ctx.fillStyle = nextPiece.color
                ctx.fillRect(xOffset + j * cellSize, yOffset + i * cellSize, cellSize, cellSize)
                ctx.strokeRect(xOffset + j * cellSize, yOffset + i * cellSize, cellSize, cellSize)
            }
        }
    }
}

function play_game(ROWS, COLS) {    
    document.body.style.overflow = "hidden"
    document.body.style.margin = "0px"
    document.body.style.padding = "0px"
    document.body.style.position = "fixed"

    var remaining_points = 300
    var can_remove = true

    const points = document.getElementById('points')
    const level = document.getElementById('level')
    const lines = document.getElementById('lines')
    const timeElement = document.getElementById('time')
   
    currentPiece = newPiece()
    nextPiece = newPiece()
    drawNextPiece(nextPiece) 

    setavoltar.style.display = "block"

    function clock() {
        const currentTime = timeElement.innerText.split(':')
        let minutes = parseInt(currentTime[0])
        let seconds = parseInt(currentTime[1])
    
        seconds++
        if (seconds >= 60) {
            seconds = 0
            minutes++
        }
    
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        timeElement.innerText = formattedTime
    
        setTimeout(clock, 1000)
    }

    let board = []
    for (let i = 0; i < ROWS; i++) {
        board.push(new Array(COLS).fill(0))
    }

    function drawPiece() {
        for (let i = 0; i < currentPiece.piece.length; i++) {
            for (let j = 0; j < currentPiece.piece[i].length; j++) {
                if (currentPiece.piece[i][j]) {
                    ctx.fillStyle = currentPiece.color
                    ctx.fillRect((currentPiece.x + j) * 20, (currentPiece.y + i) * 20, 20, 20)
                    ctx.strokeRect((currentPiece.x + j) * 20, (currentPiece.y + i) * 20, 20, 20)

                    // HardDrop preview
                    let originalY = currentPiece.y
                    while (!collides(currentPiece.x, currentPiece.y + 1, currentPiece.piece)) {
                        currentPiece.y++
                    }
                    ctx.fillStyle = '#000000'
                    ctx.globalAlpha = 0.3
                    ctx.fillRect((currentPiece.x + j) * 20, (currentPiece.y + i) * 20, 20, 20)
                    ctx.strokeRect((currentPiece.x + j) * 20, (currentPiece.y + i) * 20, 20, 20)
                    currentPiece.y = originalY
                    ctx.globalAlpha = 1.0
                }
            }
        }
    }

    function generateNewPiece() {
        currentPiece = nextPiece
        nextPiece = newPiece()
        drawNextPiece(nextPiece) // Atualize a próxima peça
    }


    function newPiece() {
        const piece = PIECES[Math.floor(Math.random() * PIECES.length)]
        return {
            piece: piece.shape,
            x: Math.floor(COLS / 2) - Math.floor(piece.shape[0].length / 2),
            y: 0, 
            color: piece.color
        }
    }
        
    const tetris_content = document.getElementById('tetris_content')
    const choose_board = document.getElementById('choose_board')
    const ctx = canvas.getContext('2d')
    canvas.style.display = 'block'
    tetris_content.style.display = 'grid'
    choose_board.style.display = 'none'
    canvas.width = COLS * 20
    canvas.height = ROWS * 20

    function collides(x, y, piece) {
        for (let i = 0; i < piece.length; i++) {
            for (let j = 0; j < piece[i].length; j++) {
                if (piece[i][j] && (board[y + i] && board[y + i][x + j]) !== 0) {
                    return true
                }
            }
        }
        return false
    }

    function drawBoard() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                if (board[i][j] !== 0) {
                    if(board[i][j] === 1){
                        ctx.fillStyle = '#000000'
                    } else{
                        ctx.fillStyle = '#FFD700' // Usar a cor original da peça,
                    }
                    
                    ctx.fillRect(j * 20, i * 20, 20, 20)
                    ctx.strokeRect(j * 20, i * 20, 20, 20)
                }
            }
        }
    }

    function drawBoardWithBorder() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Define a cor e a espessura da borda do tabuleiro
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop(0, '#ff0000')
        gradient.addColorStop(0.1, '#ff7300')
        gradient.addColorStop(0.2, '#fffb00')
        gradient.addColorStop(0.3, '#48ff00')
        gradient.addColorStop(0.4, '#00ffd5')
        gradient.addColorStop(0.5, '#002bff')
        gradient.addColorStop(0.6, '#7a00ff')
        gradient.addColorStop(0.7, '#ff00c8')
        gradient.addColorStop(1, '#ff0000')

        // Defina o gradiente como estilo de borda
        ctx.strokeStyle = gradient        
        ctx.lineWidth = 3 // Espessura da borda do tabuleiro

        // Desenha a borda do tabuleiro
        ctx.strokeRect(0, 0, canvas.width, canvas.height)

        // Define a cor da borda das peças
        ctx.strokeStyle = 'black' // Cor da borda das peças
        ctx.lineWidth = 1 // Espessura da borda das peças

        // Desenha as peças no tabuleiro
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                if (board[i][j] !== 0) {
                    if(board[i][j] === 1){
                        ctx.fillStyle = '#000000'
                    } else{
                        ctx.fillStyle = '#FFD700'
                    }
                    ctx.fillRect(j * 20, i * 20, 20, 20)

                    // Desenhe a borda das peças sem afetar a cor da borda do tabuleiro
                    ctx.strokeRect(j * 20, i * 20, 20, 20)
                }
            }
        }
    }
    
    function clearPiece() {
        for (let i = 0; i < currentPiece.piece.length; i++) {
            for (let j = 0; j < currentPiece.piece[i].length; j++) {
                if (currentPiece.piece[i][j]) {
                    board[currentPiece.y + i][currentPiece.x + j] = 0
                }
            }
        }
    }

    async function endGame() {
        const formData = new FormData();
        formData.append("pontuacao", parseInt(points.innerText));
        formData.append("nivel", parseInt(level.innerText));
    
        var xhr = new XMLHttpRequest();
    
        xhr.open('POST', '/php/saveTetrisGame.php', true);
    
        xhr.onload = function() {
            if (xhr.status == 200) {
                window.location.href = 'endGame.php'
            } else {
                console.error("Error:", xhr.statusText);
            }
        };
    
        xhr.onerror = function() {
            console.error("Network error occurred");
        };
    
        xhr.send(formData);
    }
    

    function moveDown() {
        clearPiece()
        currentPiece.y++
        if (collides(currentPiece.x, currentPiece.y, currentPiece.piece)) {
            currentPiece.y--
            placePiece()
            generateNewPiece()
            can_remove = true
            checkLines()
            if (collides(currentPiece.x, currentPiece.y, currentPiece.piece)) {
                endGame()
            }
        }
    }

    function moveLeft() {
        clearPiece()
        currentPiece.x--
        if (collides(currentPiece.x, currentPiece.y, currentPiece.piece)) {
            currentPiece.x++
        }
    }

    function moveRight() {
        clearPiece()
        currentPiece.x++
        if (collides(currentPiece.x, currentPiece.y, currentPiece.piece)) {
            currentPiece.x--
        }
    }

    function rotatePiece() {
        const rotatedPiece = []
        for (let i = 0; i < currentPiece.piece[0].length; i++) {
            let row = []
            for (let j = currentPiece.piece.length - 1; j >= 0; j--) {
                row.push(currentPiece.piece[j][i])
            }
            rotatedPiece.push(row)
        }

        if (!collides(currentPiece.x, currentPiece.y, rotatedPiece)) {
            currentPiece.piece = rotatedPiece
        }
    }

    function placePiece() {
        for (let i = 0; i < currentPiece.piece.length; i++) {
            for (let j = 0; j < currentPiece.piece[i].length; j++) {
                if (currentPiece.piece[i][j]) {
                    board[currentPiece.y + i][currentPiece.x + j] = currentPiece.piece[i][j]
                    if(currentPiece.piece[i][j] === 2){
                        board[currentPiece.y + i][currentPiece.x + j] = 1
                    }
                }
            }
        }
    }

    function hardDrop(){
        let originalY = currentPiece.y

        while (!collides(currentPiece.x, currentPiece.y + 1, currentPiece.piece)) {
            currentPiece.y++
        }
    
        if (originalY !== currentPiece.y) {
            clearPiece()
            placePiece()
            generateNewPiece()
            can_remove = true
            checkLines()
        }
    }

    function pullDownOneTimeFromLine(line) {
        for (let i = line; i >= 0; i--) {
            for (let j = 0; j < COLS; j++) {
                if (board[i][j] === 0) {
                    let x = i - 1
                    if (x >= 0) {
                        if (board[x][j] !== 0) {
                            board[i][j] = board[x][j]
                            board[x][j] = 0
                        }
                    }
                }
            }
        }
    }

    function needToRemoveLine(line) {
        for (let i = 0; i < COLS; i++) {
            if (board[line][i] === 0) {
                return false
            }
        }
        return true
    }

    function hasSpecialPiece(line) {
        for (let i = 0; i < COLS; i++) {
            if (board[line][i] === 3) {
                return true
            }
        }
        return false
    }

    let boardInverted = false

    function checkLines() {
        if (can_remove) {

            let linesToRemove = []
            for (let i = 0; i < ROWS; i++) {
                if (needToRemoveLine(i)) {
                    linesToRemove.push(i)
                    if(hasSpecialPiece(i)){
                        mirrorBoard()
                    }
                } 
            }
    
            if (linesToRemove.length > 0) {
                linesToRemove.forEach(line => {
                    for (let i = 0; i < COLS;  i++) {
                        board[line][i] = 0
                    }
                    pullDownOneTimeFromLine(line)
                    lines.innerText = parseInt(lines.innerText) + 1
                })
        
                points.innerText = parseInt(points.innerText) + (10 * (linesToRemove.length * linesToRemove.length))
        
                remaining_points -= (10 * (linesToRemove.length * linesToRemove.length))
        
                if (remaining_points <= 0) {
                    level.innerText = parseInt(level.innerText) + 1
                    increaseSpeed()
                    remaining_points += 300
                }
            }
            can_remove = false
        }
    }

    function mirrorBoard() {
        for (let i = 0; i < ROWS; i++) {
            board[i].reverse()
        }
        boardInverted = !boardInverted
    }

    document.addEventListener('keydown', event => {
        switch (event.code) {
            case 'ArrowDown':
                moveDown()
                break
            case 'ArrowRight':
                if(boardInverted){
                    moveLeft()
                } else {
                    moveRight()
                }
                break
            case 'ArrowLeft':
                if(boardInverted){
                    moveRight()
                } else {
                    moveLeft()
                }
                break
            case 'ArrowUp':
                rotatePiece()
                break
            case 'Space':
                hardDrop()
                break
        }
    })

    let currentLevel = 1

    var PHYSICS_LOOP_INTERVAL = 1000 / 2

    function increaseSpeed() {
        currentLevel++
        PHYSICS_LOOP_INTERVAL = 1000 / (2 + currentLevel) 
    }

    function physicsLoop() {
        moveDown()
        setTimeout(physicsLoop, PHYSICS_LOOP_INTERVAL)
    }

    function gameLoop() {
        if(boardInverted){
            drawBoardWithBorder()
        } else {
            drawBoard()
        }
        drawPiece()
        setTimeout(gameLoop, 1)
    }

    gameLoop()
    physicsLoop()
    clock()
}
