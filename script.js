function Gameboard() {
    let board = Array(9).fill('');
    let buttons = [];

    const displayBoard = () => {
        const tableBody = document.getElementById('board');
        tableBody.innerHTML = '';  // Destroy current board
        let count = 0;

        for (let r = 0; r < 3; r++) {
            let row = tableBody.insertRow();
            row.classList.add('grid-row')

            for (let c = 0; c < 3; c++) {
                let cell = row.insertCell();
                cell.classList.add('grid-cell')

                let button = document.createElement('button');
                button.classList.add('grid-button');
                
                button.textContent = board[count] || ' ';
                buttons[count] = button;
                cell.appendChild(button);

                count++;
            }
        }
    }
    
    const addToken = (token, index) => {
        if (board[index] === '') {
            board[index] = token;
            buttons[index].textContent = token;
        }
    }

    return { board, buttons, displayBoard, addToken };
}

function GameController(gb) {
    let currentPlayer = 'X';
    let won = false;
    const winningLines = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    let xScore = 0;
    let oScore = 0;

    const checkWin = () => {
        for (let line of winningLines) {
            if (line.every(i => gb.board[i] === currentPlayer)) {
                console.log(`${currentPlayer} Wins!`);
                document.getElementById('announcement').textContent = `${currentPlayer} Wins!`;
                if (currentPlayer === 'X') {
                    xScore++;
                    document.getElementById('XScore').innerHTML = xScore;
                } else {
                    oScore++;
                    document.getElementById('OScore').innerHTML = oScore;
                }
                console.log(xScore, oScore);
                won = true;
                document.getElementById('reset').style.visibility = 'visible';
                return;
            }
        }
        if (gb.board.every(cell => cell !== '')) {
            document.getElementById('announcement').textContent = "Draw!";
            won = true;
            document.getElementById('reset').style.visibility = 'visible';
        }
    }

    const makeMove = (index) => {
        if (!won && gb.board[index] === '') {
            gb.addToken(currentPlayer, index);
            checkWin();
            if (!won) {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                document.getElementById('announcement').textContent = `${currentPlayer}'s Turn!`;
            }
        }
    }

    const reset = () => {
        gb.board.fill('');
        gb.buttons.forEach(button => button.textContent = ' ');
        currentPlayer = 'X';
        won = false;
        document.getElementById('announcement').textContent = "X's Turn!";
        document.getElementById('reset').style.visibility = 'hidden';
    }

    // Set onclick for buttons
    gb.buttons.forEach((button, index) => {
        button.onclick = () => makeMove(index);
    });

    return { makeMove, checkWin, reset };
}

let gb = Gameboard();
gb.displayBoard();
let gc = GameController(gb);
document.getElementById('reset').onclick = gc.reset;