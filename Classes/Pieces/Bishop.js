import Piece from './Piece.js';

class Bishop extends Piece {

  constructor(player) {
    let name = "Bishop",
      img = "";

    img = player == 1 ? "url('https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png') no-repeat center" : "url('https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png') no-repeat center";
    super(name, img, player)

    this._moves = {

      spread: true,
      list: [
        [-1, 1],
        [1, -1],
        [-1, -1],
        [1, 1]
      ]
    }

  }


  get moves() {

    return this._moves;
  }

}

export default Bishop;
