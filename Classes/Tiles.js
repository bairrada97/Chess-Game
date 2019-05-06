class Tiles {

  constructor(piece) {
    this.$element = document.createElement("div"); //or get template tag ?
    this.piece = piece || "";
    this.hasValidMove = false; //hasValidMove
    this.isSelected = false;
    this.pieceThreatList = [];
    //not in use
    this.coordinates = {
      r: 0,
      c: 0
    };
    
    this.event = new CustomEvent("onTileClick", {
      "detail": {
        tile: this
      }
    });
    
  }
  getTemplate(bgcolor) {
    this.bgcolor = bgcolor
    
    this.render();
    this.$element.addEventListener('click', () => {
      document.dispatchEvent(this.event);
    })

    return this.$element

    // return `<div style="background: ${bgcolor} ${(this.piece ? this.piece.image : "")} ">${(this.piece ? this.piece.name : "")}</div>`
  }

  getPiece() {
    return this.piece
  }
  hasPiece() {
    return !!this.piece
  }
  addPiece(newPiece) {
    this.piece = newPiece;
  }

  movePieceTo(tile){
    this.piece.firstMove = false;
    tile.piece = this.piece;
    this.piece = "";
    tile.render();
    this.render();
  }

  setValidMove(isValid) {
    this.hasValidMove = isValid;
    this.render();
  }
  setSelected(isSelected) {
    this.isSelected = isSelected;
    this.render();
  }
  render(){
    //update html element 
    this.$element.innerHTML = (`${(this.piece ? this.piece.name : "")}`); //add piece name in html
    this.$element.style.background = `${this.bgcolor} ${(this.piece ? this.piece.image : "")}`;
    (this.hasValidMove ? this.$element.classList.add('valid') : this.$element.classList.remove('valid') );
    (this.isSelected ? this.$element.classList.add('selected') : this.$element.classList.remove('selected') );
  }
  
}

export default Tiles;
