let currentPiece, nextPiece;
let ctx;
const canvas = document.getElementById('tetrisCanvas');
ctx = canvas.getContext('2d'); // Inicialize ctx aqui

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
        color: '#FFFF00'
    }
]


function drawNextPiece(nextPiece) {
    const nextCanvas = document.getElementById('nextPieceCanvas');
    const ctx = nextCanvas.getContext('2d');
    ctx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);

    const piece = nextPiece.piece;
    const cellSize = 30; // Tamanho das células do canvas
    const xOffset = (nextCanvas.width - piece[0].length * cellSize) / 2;
    const yOffset = (nextCanvas.height - piece.length * cellSize) / 2;

    for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < piece[i].length; j++) {
            if (piece[i][j]) {
                ctx.fillStyle = PIECES[piece[i][j]].color;
                ctx.fillRect(xOffset + j * cellSize, yOffset + i * cellSize, cellSize, cellSize);
                ctx.strokeRect(xOffset + j * cellSize, yOffset + i * cellSize, cellSize, cellSize);
            }
        }
    }
}

function play_game(ROWS, COLS) {    
    var remaining_points = 300
    var can_remove = true

    const points = document.getElementById('points')
    const level = document.getElementById('level')
    const lines = document.getElementById('lines')
   
    currentPiece = newPiece();
    nextPiece = newPiece();
    drawNextPiece(nextPiece); 

    function clock() {
        const timeElement = document.getElementById('time');
        const currentTime = timeElement.innerText.split(':');
        let minutes = parseInt(currentTime[0]);
        let seconds = parseInt(currentTime[1]);
    
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
    
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timeElement.innerText = formattedTime;
    
        setTimeout(clock, 1000);
    }

    let board = [];
    for (let i = 0; i < ROWS; i++) {
        board.push(new Array(COLS).fill(0));
    }

    function drawPiece() {
        for (let i = 0; i < currentPiece.piece.length; i++) {
            for (let j = 0; j < currentPiece.piece[i].length; j++) {
                if (currentPiece.piece[i][j]) {
                    ctx.fillStyle = PIECES[currentPiece.piece[i][j]].color;
                    ctx.fillRect((currentPiece.x + j) * 20, (currentPiece.y + i) * 20, 20, 20);
                    ctx.strokeRect((currentPiece.x + j) * 20, (currentPiece.y + i) * 20, 20, 20);
                }
            }
        }
    }

    function generateNewPiece() {
        currentPiece = nextPiece;
        nextPiece = newPiece();
        drawNextPiece(nextPiece); // Atualize a próxima peça
    }


    function newPiece() {
        const piece = PIECES[Math.floor(Math.random() * PIECES.length)].shape;
        return {
            piece,
            x: Math.floor(COLS / 2) - Math.floor(piece[0].length / 2),
            y: 0
        };
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
                    return true;
                }
            }
        }
        return false;
    }

    function drawBoard() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                if (board[i][j] !== 0) {
                    ctx.fillStyle = PIECES[board[i][j]].color; // Usar a cor original da peça
                    ctx.fillRect(j * 20, i * 20, 20, 20);
                    ctx.strokeRect(j * 20, i * 20, 20, 20);
                }
            }
        }
    }
    

    function clearPiece() {
        for (let i = 0; i < currentPiece.piece.length; i++) {
            for (let j = 0; j < currentPiece.piece[i].length; j++) {
                if (currentPiece.piece[i][j]) {
                    board[currentPiece.y + i][currentPiece.x + j] = 0;
                }
            }
        }
    }

    function moveDown() {
        clearPiece();
        currentPiece.y++;
        if (collides(currentPiece.x, currentPiece.y, currentPiece.piece)) {
            currentPiece.y--;
            placePiece();
            generateNewPiece();
            can_remove = true
            checkLines()
            if (collides(currentPiece.x, currentPiece.y, currentPiece.piece)) {
                alert('Fim do jogo!')
            }
        }
    }

    function moveLeft() {
        clearPiece();
        currentPiece.x--;
        if (collides(currentPiece.x, currentPiece.y, currentPiece.piece)) {
            currentPiece.x++;
        }
    }

    function moveRight() {
        clearPiece();
        currentPiece.x++;
        if (collides(currentPiece.x, currentPiece.y, currentPiece.piece)) {
            currentPiece.x--;
        }
    }

    function rotatePiece() {
        const rotatedPiece = [];
        for (let i = 0; i < currentPiece.piece[0].length; i++) {
            let row = [];
            for (let j = currentPiece.piece.length - 1; j >= 0; j--) {
                row.push(currentPiece.piece[j][i]);
            }
            rotatedPiece.push(row);
        }

        if (!collides(currentPiece.x, currentPiece.y, rotatedPiece)) {
            currentPiece.piece = rotatedPiece;
        }
    }

    function placePiece() {
        for (let i = 0; i < currentPiece.piece.length; i++) {
            for (let j = 0; j < currentPiece.piece[i].length; j++) {
                if (currentPiece.piece[i][j]) {
                    board[currentPiece.y + i][currentPiece.x + j] = currentPiece.piece[i][j];
                }
            }
        }
    }

    function hardDrop(){
        let originalY = currentPiece.y;

        while (!collides(currentPiece.x, currentPiece.y + 1, currentPiece.piece)) {
            currentPiece.y++;
        }
    
        if (originalY !== currentPiece.y) {
            clearPiece();
            placePiece();
            generateNewPiece();
            can_remove = true;
            checkLines();
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
                return true;
            }
        }
        return false;
    }

    let controlsInverted = false;

    function checkLines() {
        if (can_remove) {

            let linesToRemove = []
            for (let i = 0; i < ROWS; i++) {
                if (needToRemoveLine(i)) {
                    linesToRemove.push(i)
                    if(hasSpecialPiece(i)){
                        mirrorBoard()
                        controlsInverted = !controlsInverted;
                    }
                } 
            }
    
            if (linesToRemove.length > 0) {
                linesToRemove.forEach(line => {
                    for (let i = 0; i < COLS ; i++) {
                        board[line][i] = 0;
                    }
                    pullDownOneTimeFromLine(line)
                    lines.innerText = parseInt(lines.innerText) + 1
                })
        
                points.innerText = parseInt(points.innerText) + (10 * (linesToRemove.length * linesToRemove.length))
        
                remaining_points -= parseInt(points.innerText)
        
                if (remaining_points <= 0) {
                    level.innerText = parseInt(level.innerText) + 1
                    increaseSpeed();
                    remaining_points += 300
                }
            }
            can_remove = false
        }
    }

    function mirrorBoard() {
        for (let i = 0; i < ROWS; i++) {
            board[i].reverse();
        }
    }

    document.addEventListener('keydown', event => {
        if (controlsInverted) {
            switch (event.code) {
                case 'ArrowDown':
                    moveDown();
                    break;
                case 'ArrowRight':
                    moveLeft();
                    break;
                case 'ArrowLeft':
                    moveRight();
                    break;
                case 'ArrowUp':
                    rotatePiece();
                    break;
                case 'Space':
                    hardDrop();
                    break;
            }
        } else {
            switch (event.code) {
                case 'ArrowDown':
                    moveDown();
                    break;
                case 'ArrowRight':
                    moveRight();
                    break;
                case 'ArrowLeft':
                    moveLeft();
                    break;
                case 'ArrowUp':
                    rotatePiece();
                    break;
                case 'Space':
                    hardDrop();
                    break;
            }
        }
    });

    let currentLevel = 1;

    var PHYSICS_LOOP_INTERVAL = 1000 / 2;

    function increaseSpeed() {
        currentLevel++;
        PHYSICS_LOOP_INTERVAL = 1000 / (2 + currentLevel); 
    }

    function physicsLoop() {
        moveDown()
        setTimeout(physicsLoop, PHYSICS_LOOP_INTERVAL)
    }

    function gameLoop() {
        drawBoard();
        drawPiece();
        setTimeout(gameLoop, 1);
    }

    gameLoop()
    physicsLoop()
    clock()
}
