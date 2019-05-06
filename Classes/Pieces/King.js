import Piece from './Piece.js';

class King extends Piece {

  constructor(player) {
    let name = "King",
      img = "";

    img = player == 1 ? "url('https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png') no-repeat center" : "url('https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png') no-repeat center";
    super(name, img, player)

    this._moves = {

      spread: false,
      list: [
        [1, 0],  //down
        [-1, 0], //up
        [0, 1],  //right
        [0, -1], //left
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
