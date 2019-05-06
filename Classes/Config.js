import Tiles from './Tiles.js';
//TODO: Use piece factory ?
import Pieces, {
    Rook,
    Knight,
    Bishop,
    Pawn,
    Queen,
    King
  } from './Pieces/Pieces.js'

class Config {
    constructor(){
        this.htmlClass = ".chess";
        this.player1 = 1;
        this.player2 = 2;
        //board colors
        this.board = {
            size : 8,// 8 tiles
            color:{
                even: "#7d8796",
                odd: "#fff"
            }
        }

        this.boards = []; //stores boards pieces configuration
        this.boards['empty'] = this.createEmptyBoard();

        
        this.initBoards();
    }

    createEmptyBoard(){
        let board = []; 
        
        for (let r = 0; r < this.board.size; r++) {
            board.push([]); //create new row
            for (let c = 0; c < this.board.size; c++) {
                board[r].push(new Tiles()); //create new column
            }
            
        }
        return board;      
    }

    initBoards(){
        //TODO: Json config?
        /*
         *  {
            "player2": {
                "row": {
                "0 ": {
                    "column": 0,
                    "piece": "rook"
                }
                }
            }
            }
         */
        var board = this.createEmptyBoard();
      
        board[0][0].addPiece(new Rook( this.player2));
        board[0][1].addPiece(new Knight( this.player2));
        board[0][2].addPiece(new Bishop( this.player2));
        board[0][3].addPiece(new Queen( this.player2));
        board[0][4].addPiece(new King( this.player2));
        board[0][5].addPiece(new Bishop( this.player2));
        board[0][6].addPiece(new Knight( this.player2));
        board[0][7].addPiece(new Rook( this.player2));
        //black pawn row
        for (var c = 0; c < this.board.size; c++) { 
            board[1][c].addPiece(new Pawn(this.player2)) 
        }
        
        //white
        board[7][0].addPiece(new Rook(this.player1));
        board[7][1].addPiece(new Knight(this.player1));
        board[7][2].addPiece(new Bishop(this.player1));
        board[7][3].addPiece(new Queen(this.player1));
        board[7][4].addPiece(new King(this.player1));
        board[7][5].addPiece(new Bishop(this.player1));
        board[7][6].addPiece(new Knight(this.player1));
        board[7][7].addPiece(new Rook(this.player1));
        //white pawn row
        for (var c = 0; c < this.board.size; c++) { 
            board[6][c].addPiece(new Pawn(this.player1)) 
        }
        this.boards['default'] = board;  
        
        board = this.createEmptyBoard();

        board[1][5].addPiece(new Pawn(this.player2));
        board[1][6].addPiece(new Pawn(this.player2));
        board[1][7].addPiece(new Pawn(this.player2));
        board[5][0].addPiece(new King(this.player2));

        board[3][5].addPiece(new Pawn(this.player1));
        board[3][6].addPiece(new Pawn(this.player1));
        board[3][7].addPiece(new Pawn(this.player1));
        board[5][2].addPiece(new King(this.player1));

        this.boards['threepawn'] = board;  
    }
}

export default new Config();