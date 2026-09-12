const gameGrid = document.getElementById('game-grid')
const gameOverMask = document.getElementById('gameover-mask')
const youWinMask = document.getElementById('youwin-mask')
const playAgainButtons = document.getElementsByClassName('playagain-button')

const GRID_SIZE= 10
const DENSITY  = 0.1
const TOTAL_BOMBS = GRID_SIZE * GRID_SIZE * DENSITY

var grid
var marked
var unlocked
var gameOver

function initVars() {
    gameOver = false
    grid = Array.from({ length: GRID_SIZE },() => Array(GRID_SIZE).fill(0))
    marked = Array.from({ length: GRID_SIZE },() => Array(GRID_SIZE).fill(false))
    unlocked = Array.from({ length: GRID_SIZE },() => Array(GRID_SIZE).fill(false))
}

function hideMasks() {
    gameOverMask.style.display = 'none'
    youWinMask.style.display = 'none'
}

function createGridCells() {

    let mountedBombs = 0
    while(mountedBombs < TOTAL_BOMBS) {
        var i, j;
        do {
            i = Math.floor(Math.random()*GRID_SIZE)
            j = Math.floor(Math.random()*GRID_SIZE)
        } while(grid[i][j] === -1)

        grid[i][j] = -1
        mountedBombs++
    }

    gameGrid.innerHTML = ''
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const cell = document.createElement('div')
            cell.setAttribute('id',`${i}_${j}`)
            cell.classList.add('cell', 'blocked')
            cell.onclick = () => { unlockCell(i, j) }
            cell.addEventListener('contextmenu',(event) => {
                event.preventDefault()
                markCell(i, j)
            })
            gameGrid.appendChild(cell)
        }
    }

    gameGrid.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`
    gameGrid.style.gridTemplateRows    = `repeat(${GRID_SIZE}, 1fr)`
}

function fillNumbers() {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            if (grid[i][j] !== -1) {
                const cell = document.getElementById(`${i}_${j}`)
                const bombsCount = countBombsArround(i, j)
                grid[i][j] = bombsCount
                // cell.textContent = bombsCount
            }
        }
    }
}

function validateIndexes(i, j) {
    return (i >= 0 && i < GRID_SIZE && j >= 0 && j < GRID_SIZE)
}

function countBombsArround(i, j) {
    if (!validateIndexes(i, j)) {
        return 0
    }

    let count = 0
    for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {
            if (hasBombIn(k, l)) {
                count++;
            }
        }
    }

    return count
}

function hasBombIn(i, j) {
    if (!validateIndexes(i, j)) {
        return false
    }
    return grid[i][j] === -1
}

function unlockCell(i, j) {

    if (!validateIndexes(i, j) || marked[i][j]) {
        return
    }

    const cell = document.getElementById(`${i}_${j}`)

    if (grid[i][j] === -1) {
        gameOver = true
        unlockALlBombs()
        showModal(gameOver)
    } else if (grid[i][j] !== 0) {
        cell.classList.add('unlocked',`cell-${grid[i][j]}`)
        cell.textContent = grid[i][j]
        unlocked[i][j] = true
    } else {
        floodFill(i, j)
    }

    checkVictory()
}

function unlockALlBombs() {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            if (grid[i][j] === -1) {
                const cell = document.getElementById(`${i}_${j}`)
                cell.classList.add('bomb')
                cell.textContent = '💣'
                unlocked[i][j] = true
            }
        }
    }
}

function floodFill(i, j) {
    if (!validateIndexes(i, j) || unlocked[i][j]) {
        return
    }

    const cell = document.getElementById(`${i}_${j}`)
    cell.classList.add('unlocked',`cell-${grid[i][j]}`)
    unlocked[i][j] = true

    if (grid[i][j] > 0) {
        cell.textContent = grid[i][j]
    } else if (grid[i][j] === 0) {
        floodFill(i, j - 1)
        floodFill(i, j + 1)
        floodFill(i - 1, j)
        floodFill(i + 1, j)
    }

    checkVictory()
}

function markCell(i, j) {
    if (!validateIndexes(i, j) || unlocked[i][j]) {
        return
    }
    const cell = document.getElementById(`${i}_${j}`)
    cell.textContent = marked[i][j] = cell.classList.toggle('marked') ? '⚑' : ''
    checkVictory()
}

function showModal(itsGameOver) {
    gameOverMask.style.display = itsGameOver ? 'grid' : 'none'
    youWinMask.style.display = ! itsGameOver ? 'grid' : 'none'
}

function checkVictory() {
    let unclockedCount = 0
    let markedCount = 0
    unlocked.forEach(row => {
        row.forEach(status => {
            if (status) {
                unclockedCount++;
            }
        })
    })
    marked.forEach(row => {
        row.forEach(status => {
            if (status) {
                markedCount++;
            }
        })
    })

    if (markedCount + unclockedCount == GRID_SIZE * GRID_SIZE) {
        showModal(gameOver)
    }
}

function startGame() {
    hideMasks()
    initVars()
    createGridCells()
    fillNumbers()
}

startGame()