import Players from './Players.js';
import Config from './Config.js';

//
class Board {

  constructor() {
    this.$el = document.querySelector(Config.htmlClass);

    this.activeTile = null;
    this.activeTileList = [];

    this.player1 = new Players(1);
    this.player2 = new Players(2);
    this.activePlayer = this.player1;

    this.board = Config.boards.default;
    console.log(Config.boards);
    this.pieces = [];


    this.loadBoard('default');

    this.events();

    console.log(this.pieces);
    this.activeTile = this.pieces[3]
    this.setPossibleMoves();
    // for(let piece of this.pieces){

    //   this.activeTile = piece
    //   this.setPossibleMoves();

    // }
  }

  loadBoard(board) {
    this.board = Config.boards[board];
    this.renderBoard();
  }
  /**
   * Render board on html
   */
  renderBoard() {

    for (let r = 0; r < this.board.length; r++) {
      for (var c = 0; c < this.board.length; c++) {
        let tile = this.board[r][c];
        let bgcolor = "";
        //row is even
        if (r % 2 == 0) {
          bgcolor = ((c % 2 == 0 ? Config.board.color.even : Config.board.color.odd));
        } else {
          bgcolor = ((c % 2 != 0 ? Config.board.color.even : Config.board.color.odd));
        }

        this.$el.append(tile.getTemplate(bgcolor));
        tile.coordinates.r = r;
        tile.coordinates.c = c;
      }
    }
  }

  onTileClick(selectedTile) {
    //first click, no selected tile
    if (!this.activeTile) {

      if (selectedTile.hasPiece()) {
        var selectedPiece = selectedTile.getPiece();

        //click on active player piece
        if (selectedPiece.player == this.activePlayer.color) {
          this.setActiveTile(selectedTile);
        }

      }



    }
    //piece already clicked
    else {
      var selectedPiece = selectedTile.getPiece();

      //click on same tile
      if (this.activeTile == selectedTile) {
        this.resetActiveTile();
        return;
      }

      //same color click
      if (selectedPiece && selectedPiece.player == this.activePlayer.color && this.activeTile.piece.player == this.activePlayer.color) {
        this.resetActiveTile();
        this.setActiveTile(selectedTile);
        return;
      }


      //if its a valid move
      if (selectedTile.hasValidMove) {
        this.activeTile.movePieceTo(selectedTile);

        //if destination tile has a enemy piece
        if (selectedPiece && selectedPiece.player != this.activePlayer.color) {
          //TODO: update destroyed pieces on player array
          //player.destroyedPieces.push(selectedPiece)
          selectedPiece = null;
        }

        //update game
        this.swapPlayer();
        this.resetActiveTile();
      }
    }
  }

  setActiveTile(tile) {
    tile.setSelected(true);
    this.activeTile = tile;

    this.setPossibleMoves();
  }

  setPossibleMoves() {

    const moves = this.activeTile.piece.moves;
    let activeTile = this.activeTile;

    //se tiver ataque diferente
    if (this.activeTile.piece.attack) {

      const attack = this.activeTile.piece.attackMoves;
      for (var j = 0; j < attack.list.length; j++) {
        let r = attack.list[j][0],
          c = attack.list[j][1],
          Ar = activeTile.coordinates.r,
          Ac = activeTile.coordinates.c;

        Ac += c;
        Ar += r

        /* if (this.isInBounds(Ac, Ar) && this.board[Ar][Ac].piece.player != this.activePlayer.color && this.board[Ar][Ac].hasPiece()) {
           this.updateActiveTileList(this.board[Ar][Ac]);
           console.log(this.board[Ar][Ac].piece);

           continue;

         }*/

        if (this.isInBounds(Ac, Ar) && this.board[Ar][Ac].hasPiece() && this.board[Ar][Ac].piece.player != this.activePlayer.color) {

          let tile = this.board[Ar][Ac];

          this.updateActiveTileList(tile);
          continue;
        }

      }
    }
    /*else {
         let tile = this.board[Ar][Ac];

         this.updateActiveTileList(tile);

       }*/


    for (var i = 0; i < moves.list.length; i++) {
      let r = moves.list[i][0],
        c = moves.list[i][1],
        _r = activeTile.coordinates.r,
        _c = activeTile.coordinates.c;

      _c += c;
      _r += r;

      if (this.isInBounds(_c, _r)) {

        //se nao alastra o movimento
        if (!moves.spread) {

          if (!this.board[_r][_c].hasPiece()) {
            let tile = this.board[_r][_c];
            this.updateActiveTileList(tile);
            continue;
          }

          if (this.board[_r][_c].hasPiece() && this.board[_r][_c].piece.player != this.activePlayer.color) {
            if (this.activeTile.piece.attack) break;
            let tile = this.board[_r][_c];
            this.updateActiveTileList(tile);
            continue;
          }
        } else {



          // incrementa os tiles possiveis ate encontrar uma peça inimiga e enquanto houver tiles vazios;
          while (this.isInBounds(_c, _r) && (this.board[_r][_c].piece.player != activeTile.piece.player || !this.board[_r][_c].hasPiece())) {
            let tile = this.board[_r][_c];


            //se a peça foi inimiga acrescenta um possible move ao tile onde esta situado a peça inimiga
            if (this.isInBounds(_c, _r) && this.board[_r][_c].piece.player != activeTile.piece.player && this.board[_r][_c].hasPiece()) {
              this.updateActiveTileList(tile);
              break;
            }


            this.updateActiveTileList(tile);
            _c += c;
            _r += r;
          }
        }
      }

    }


  }

  resetActiveTile() {

    for (var i = 0; i < this.activeTileList.length; i++) {
      this.activeTileList[i].setValidMove(false);
    }
    this.activeTileList = [];
    this.activeTile.setSelected(false);
    this.activeTile = null;
  }

  swapPlayer() {
    if (this.activePlayer == this.player1) {
      this.activePlayer = this.player2
    } else {
      this.activePlayer = this.player1
    }
  }

  isInBounds(_c, _r) {
    return (_r >= 0 && _r <= this.board.length - 1) && (_c >= 0 && _c <= this.board[0].length - 1)
  }

  updateActiveTileList(tile) {
    this.activeTileList.push(tile);
    tile.setValidMove(true);
  }
  getKing(color) {
    for (let r = 0; r < this.board.length; r++) {
      for (var c = 0; c < this.board.length; c++) {
        let tile = this.board[r][c];
        if (tile.piece.name == "King" && tile.piece.player == color) {

          return tile.piece;
        }
      }
    }
  }

  events() {
    document.addEventListener("onTileClick", (e) => {
      this.onTileClick(e.detail.tile);
    });
  }

}


export default Board;
