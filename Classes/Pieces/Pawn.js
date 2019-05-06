import Piece from './Piece.js';

class Pawn extends Piece {

  constructor(player) {
    let name = "pawn",
      img = "";


    img = player == 1 ? "url('https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png') no-repeat center" : "url('https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png') no-repeat center";
    super(name, img, player);
    this.firstMove = true;
    this.attack = true;

    if (player == 1) {
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

      this.attackMoves = {
        spread: false,
        list: [
          [-1, 1],
          [-1, -1]
        ]

      };
    } else {
      this._moves = {
        firstmove: {
          spread: false,
          list: [
            [1, 0],
            [2, 0]
          ]
        },
        otherMoves: {
          spread: false,
          list: [
            [1, 0],
          ]
        }
      }

      this.attackMoves = {
        spread: false,
        list: [
          [1, -1],
          [1, 1]
        ]

      };
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