class Piece {

  constructor(name, image, color) {
    this.name = name;
    this.image = image;
    this.color = color
    this.firstMove = true;
  }

  moveTo(tile){
    console.log(tile);
    this.firstMove = false;
    tile.piece = this;
  }

  // getPossibleMoves(tile){
  //   const moves = tile.piece.moves;
  //
  //
  //   for (var i = 0; i < moves.list.length; i++) {
  //     let r = moves.list[i][0],
  //       c = moves.list[i][1];
  //     let _r = tile.coordinates.r;
  //     let _c = tile.coordinates.c;
  //
  //     do {
  //       _c += c;
  //       _r += r;
  //       let tile = this.board[_r][_c];
  //       this.tileList.push(tile);
  //       tile.possibleMoves = true;
  //       tile.element.classList.add('selected');
  //     }
  //     while (this.board[_r][_c].piece == "" && moves.spread)
  //   }
  // }
}

export default Piece;
