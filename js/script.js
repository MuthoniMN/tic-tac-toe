const board = document.querySelectorAll('input')

board.forEach((move) => {
    move.addEventListener('keydown', () => {
        if(!(move.value.toUpperCase() === 'X' || move.value.toUpperCase() === 'O')){
            move.value = ""
        }else{
            let values = []
            let player2
            board.forEach((val) => {
                if (val.value) {
                    values.push(val.value)
                }
            })
            player2 = checkUserInput(values[0])
            getRandomChoice(board, player2)
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
    if(!arr[randomIndex].value){
        arr[randomIndex].value = choice
    }else{
        getRandomChoice(arr, choice)
    }
}

function checkWin(arr) {
    let top = arr.slice(2)
    let middle = arr.slice(3,5)
    let bottom = arr.slice(-3)
    
    let topWin = checkRow(top)
    let middleWin = checkRow(middle)
    let bottomWin = checkRow(bottom)

    if(!(topWin || middleWin || bottomWin)){
        if (!(checkColumns(top, middle, bottom))) {
            if ((checkDiagonal(top, middle, bottom))) {
                getRandomChoice(arr, choice)
            }
        }
    }else{
        if(topWin){
            return topWin
        }else if(middleWin){
            return middleWin
        }else if(bottomWin){
            return bottomWin
        }else if (checkColumns(top, middle, bottom)) {
            return checkColumns(top, middle, bottom)
        }else if (checkDiagonal(top, middle, bottom)) {
            return checkDiagonal(top, middle, bottom)
        }
    }
}

function checkRow(arr) {
    let value = arr.reduce((acc, c) => {
       return acc === c ? acc : false
    })
    return value
}
console.log(checkRow(['A', 'A', 'A'])); 

function checkColumns(a, b, c) {
    for (let i = 0; i < a.length; i++) {
        if(a[i] === b[i] && a[i] === c[i]){
            return a[i]
        }
    }
}

console.log(checkColumns(['A', 'B'], ['A', 'C'], ['A', 'D'])); 

function checkDiagonal(a, b, c) {
    if((a[0] === b[1] && a[0] === c[2]) || (a[2] === b[1] && a[2] === c[0])){
        return a[0]
    }
}
console.log(checkDiagonal(['A', 'B', 'D'], ['B', 'A', 'C'], ['A', 'D', 'A'])); 

function declareWinner(winner, player2) {
    if (winner === player2) {
        return 'YOU LOST😓'
    }else{
        return 'YOU WON!!!!!🎊🎉'
    }
}