import Piece from './Piece.js';

class Tiles {

  constructor(piece) {
    this.piece = piece || "";
    this.coordinates = {
      r: 0,
      c: 0
    };
    this.possibleMoves = false;
    this.event = new CustomEvent("onTileClick", {
      "detail": {
        tile: this
      }
    });
    this.element = document.createElement("div")
  }
  getTemplate(bgcolor) {
    this.element = document.createElement("div");
    this.element.style.background = `${bgcolor} ${(this.piece ? this.piece.image : "")}`;
    this.element.append(`${(this.piece ? this.piece.name : "")}`);

    this.element.addEventListener('click', () => {
      document.dispatchEvent(this.event);
    })

    return this.element

    // return `<div style="background: ${bgcolor} ${(this.piece ? this.piece.image : "")} ">${(this.piece ? this.piece.name : "")}</div>`
  }

  getPiece() {
    return this.piece
  }

  setPiece(newPiece) {
    this.piece = newPiece;
  }

  setPossibleMoves(boolean) {
    this.possibleMoves = boolean;
    if (boolean) {
      this.element.classList.add('selected');
    } else {
      this.element.classList.remove('selected');
    }

  }

  hasPiece() {
    return !!this.piece
  }
}

export default Tiles;
