// Player class
function createPlayer(symbol) {
    this.symbol = symbol; 
}

// Game (board) class
// creates an instance of a game
function createGame() {
    const p1 = new createPlayer("X"); 
    const p2 = new createPlayer("O"); 

    let board = [" ", " ", " ", 
                 " ", " ", " ", 
                 " ", " ", " "]; 

    // p1 goes first 
    let turn = p1; 

    // play a single piece
    this.play = function(position) {
        const symbol = turn.symbol; 
        // if position is not taken, set as taken 
        if (board[position] == " ") {
            board[position] = symbol; 
            
            // render updated positon info 
            this.render(position, symbol); 
            
            // check for winner
            const win = this.checkWinner(symbol); 
            if (win) {
                // handle win case 
                this.winningBoard(turn); 
                return true; 
            }

            // current player turn over, change to next player 
            turn = (turn == p1) ? p2 : p1; 
        }
        // if position is already taken, no action needed 
        return false; 
    }

    // check if player with given symbol is a winner 
    this.checkWinner = function(symbol) {
        if ((board[0] == symbol && board[1] == symbol && board[2] == symbol) ||
            (board[3] == symbol && board[4] == symbol && board[5] == symbol) || 
            (board[6] == symbol && board[7] == symbol && board[8] == symbol) || 
            (board[0] == symbol && board[3] == symbol && board[6] == symbol) || 
            (board[1] == symbol && board[4] == symbol && board[7] == symbol) ||
            (board[2] == symbol && board[5] == symbol && board[8] == symbol) ||
            (board[0] == symbol && board[4] == symbol && board[8] == symbol) ||
            (board[2] == symbol && board[4] == symbol && board[6] == symbol)) {
                return true; 
            } 
        return false; 
    }

    // given position and symbol, update the box in div
    this.render = function(position, symbol) {
        const pos = "#cell" + position; 
        document.querySelector(pos).innerHTML = symbol; 
    }

    this.winningBoard = function(winningPlayer) {
        document.querySelector(".announce_winner").innerHTML = "Winner: Player " + winningPlayer.symbol; 
    }

    return { p1, p2, board, play: this.play.bind(this) }; 
}

const game = new createGame(); 

// define the click handler function
const clickHandler = (event) => {
    const cell = event.target;
    const pos = parseInt(cell.id.slice(4));
    const gameOver = game.play(pos);
    if (gameOver) {
        // Remove all event listeners from cells
        cells.forEach(cell => {
            cell.removeEventListener("click", clickHandler);
        });
    }
};

// add event listener to each cell
const cells = document.querySelectorAll(".sec");

cells.forEach(cell => {
    cell.addEventListener("click", clickHandler);
});

