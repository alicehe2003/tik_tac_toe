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
            
            // current player turn over, change to next player 
            turn = (turn == p1) ? p2 : p1; 

            // render updated positon info 
            this.render(position, symbol); 
            
            // check for winner
            const win = this.checkWinner(symbol); 
            if (win) {
                console.log("Player with symbol " + symbol + " wins!"); 
                // TODO: render winner info 
            }
        }
        // if position is already taken, no action needed 
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

    return { p1, p2, board, play: this.play.bind(this) }; 
}

const game = new createGame(); 
game.play(0); 
game.play(3); 
game.play(1); 
game.play(4); 
game.play(2); 
