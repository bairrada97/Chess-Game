import Piece from './Piece.js';

class Pawn extends Piece {

  constructor(color) {
    let name = "pawn",
      img = "";

    img = color == '#fff' ? "url('https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png') no-repeat center" : "url('https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png') no-repeat center";
    super(name, img, color);
    this.firstMove = true;

    if (color == '#fff') {
      this._moves = {
        firstmove: {
          spread: false,
          list: [
            [-1, 0],
            [-2, 0]
          ]
        },
        otherMoves: {
          spread: false,
          list: [
            [-1, 0],
          ]
        }
      }


    }else{
      this._moves = {
        firstmove: {
          spread : false,
          list:[
            [1, 0],
            [2, 0]
          ]
        },
        otherMoves:{
          spread : false,
          list:[
            [1, 0],
          ]
        }
    }
    }

    };


  get moves() {
    if (this.firstMove) {

      return this._moves.firstmove
    } else {
      return this._moves.otherMoves
    }
    return this._moves;
  }

}

export default Pawn;
