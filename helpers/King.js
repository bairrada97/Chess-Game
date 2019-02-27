import Piece from './Piece.js';

class King extends Piece {

  constructor(color) {
    let name = "King",
      img = "";

    img = color == '#000' ? "url('https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png') no-repeat center" : "url('https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png') no-repeat center";
    super(name, img, color)

    this._moves = {

      spread: false,
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

export default King;
