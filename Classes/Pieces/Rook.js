import Piece from './Piece.js';

class Rook extends Piece {

  constructor(player) {
    let name = "Rook",
      img = "";

    img = player == 1 ? "url('https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png') no-repeat center" : "url('https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png') no-repeat center";
    super(name, img, player)

    this._moves = {

      spread: true,
      list: [
        [-1, 0],
        [0, 1],
        [0, -1],
        [1, 0],
      ]
    }


};


get moves() {

  return this._moves;
}





}

export default Rook;
