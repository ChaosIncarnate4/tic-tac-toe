const prompt = require('prompt-sync')();

function Board() {
    let board = [['', '', ''], ['', '', ''], ['', '', '']];
    const addToken = (token, row, col) => {
        token==='X' ? board[row][col] = 'X' : board[row][col] = 'O';
    }
    return board;
}

const winningLines = new Set([[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [3, 5, 7], [1, 5, 9]]);
const board = new Map();
board.set(1, false);
board.set(2, false);
board.set(3, false);
board.set(4, false);
board.set(5, false);
board.set(6, false);
board.set(7, false);
board.set(8, false);
board.set(9, false);
let won = false;
let turnCount = 1;
let xTurn = true;
let xBoxes = [];
let oBoxes = [];

function GameController() {
    while (!won && turnCount < 10) {
        if (xTurn) {
            let xCell = parseInt(prompt("X's turn; enter a grid number: "));
            while (xCell < 1 || xCell > 9 || !Number.isInteger(xCell) || board.get(xCell)) {
                xCell = parseInt(prompt("Please enter a valid grid number: "));
            }
            board.set(xCell, true);
            xBoxes.push(xCell);
            xTurn = false;

            //check win condition here
            winningLines.forEach((line) => {
                if (line.every(x => xBoxes.includes(x))) {
                    console.log("X Wins!");
                    won = true;
                }
            })
        } else { 
            let oCell = parseInt(prompt("O's turn; enter a grid number: ")); 
            while (oCell < 1 || oCell > 9 || !Number.isInteger(oCell) || board.get(oCell)) {
                oCell = parseInt(prompt("Please enter a valid grid number: "));
            }
            board.set(oCell, true);
            oBoxes.push(oCell);
            xTurn = true;

            winningLines.forEach((line) => {
                if (line.every(o => oBoxes.includes(o))) {
                    console.log("O Wins!");
                    won = true;
                }
            })
        }

        turnCount++;

        
    }
}

GameController()
