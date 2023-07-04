const board = document.querySelectorAll('input')

board.forEach((move) => {
    move.addEventListener('keydown', () => {
        if (!(move.value.toUpperCase() === 'X' || move.value.toUpperCase() === 'O')) {
            move.value = ""
        } else {
            let values = []
            let player2
            board.forEach((val) => {
                if (val.value) {
                    values.push(val.value)
                }
            })
            player2 = checkUserInput(values[0])
            let winner = checkWin(board)

            if (winner) {
                document.querySelector('#result').innerHTML = declareWinner(winner, player2)
                board.forEach((key) => key.removeEventListener('keydown', restart))
            } else {
                getRandomChoice(board, player2)
            }
        }
    })
})

function checkUserInput(a) {
    if (a.toUpperCase() === "X") {
        return 'O'
    }
    return 'X'
}

function getRandomChoice(arr, choice) {
    let randomIndex = Math.floor(Math.random() * 9)
    console.log(randomIndex);
    if (!arr[randomIndex].value) {
        arr[randomIndex].value = choice
    } else {
        getRandomChoice(arr, choice)
    }
}

function checkWin(arr) {
    let top = []
    let middle = []
    let bottom = []

    for (let i = 0; i < arr.length; i++) {
        if (top.length !== 3) {
            top.push(arr[i].value)
        } else if (middle.length !== 3) {
            middle.push(arr[i].value)
        } else if (bottom.length !== 3) {
            bottom.push(arr[i].value)
        }
    }

    let topWin = checkRow(top)
    let middleWin = checkRow(middle)
    let bottomWin = checkRow(bottom)

    if (topWin) {
        console.log('Top Bingo');
        return topWin
    } else if (middleWin) {
        console.log('Middle Bingo');
        return middleWin
    } else if (bottomWin) {
        console.log('Bottom Bingo');
        return bottomWin
    } else if (checkColumns(top, middle, bottom)) {
        console.log('Column Bingo');
        return checkColumns(top, middle, bottom)
    } else if (checkDiagonal(top, middle, bottom)) {
        console.log('Diagonal Bingo');
        return checkDiagonal(top, middle, bottom)
    }
}

function checkRow(arr) {
    if (arr[0]) {
        let value = arr[0]

        for (let i = 0; i < arr.length; i++) {
            if (!(arr[i] == value)) {
                return false
            }
        }

        return value
    }

}

function checkColumns(a, b, c) {
    for (let i = 0; i < a.length; i++) {
        if (a[i].value && b[i].value && c[i].value) {
            if (a[i].value === b[i].value && a[i].value === c[i].value) {
                return a[i]
            }
        }
    }
}

function checkDiagonal(a, b, c) {
    if (a[0].value && b[1].value && c[2].value && a[2].value && c[0].value) {
        if ((a[0].value === b[1].value && a[0].value === c[2].value) || (a[2].value === b[1].value && a[2].value === c[0].value)) {
            return a[0]
        }
    }
}

function declareWinner(winner, player2) {
    if (winner === player2) {
        return 'YOU LOST😓'
    } else {
        return 'YOU WON!!!!!🎊🎉'
    }
}

function restart() {
    board.forEach((box) => {
        box.value = ""
        document.querySelector('#result').innerHTML = ""
    })
}