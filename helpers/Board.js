//TODO: Use piece factory ?
import Pieces, {
  Rook,
  Knight,
  Bishop,
  Pawn,
  Queen,
  King
} from './Pieces.js'
import Piece from './Piece.js';
import Tiles from './Tiles.js';
import Players from './Players.js';



class Board {

  constructor() {

    this.activeTile = null;
    this.activeTileList = [];

    this.player1 = new Players("#fff");
    this.player2 = new Players("#000");
    this.activePlayer = this.player1;
    this.board = this.buildBoard();
    this.drawBoard();

    let king = this.getKing("#fff");
    console.log(king.isChecked());
    this.events();

  }

  buildBoard() {
    //TODO: board on config file
    this.board = [
      [new Tiles(new Rook(this.player2.color)), new Tiles(new Knight(this.player2.color)), new Tiles(new Bishop(this.player2.color)), new Tiles(new Queen(this.player2.color)), new Tiles(new King(this.player2.color)), new Tiles(new Bishop(this.player2.color)), new Tiles(new Knight(this.player2.color)), new Tiles(new Rook(this.player2.color))],
      [new Tiles(new Pawn(this.player2.color)), new Tiles(new Pawn(this.player2.color)), new Tiles(new Pawn(this.player2.color)), new Tiles(new Pawn(this.player2.color)), new Tiles(new Pawn(this.player2.color)), new Tiles(new Pawn(this.player2.color)), new Tiles(new Pawn(this.player2.color)), new Tiles(new Pawn(this.player2.color))],
      [new Tiles(), new Tiles(), new Tiles(), new Tiles(), new Tiles(), new Tiles(), new Tiles(), new Tiles(), new Tiles()],
      [new Tiles(), new Tiles(), new Tiles(), new Tiles(), new Tiles(), new Tiles(), new Tiles(), new Tiles(), new Tiles()],
      [new Tiles(), new Tiles(), new Tiles(), new Tiles(), new Tiles(), new Tiles(), new Tiles(), new Tiles(), new Tiles()],
      [new Tiles(), new Tiles(), new Tiles(), new Tiles(), new Tiles(), new Tiles(), new Tiles(), new Tiles(), new Tiles()],
      [new Tiles(new Pawn(this.player1.color)), new Tiles(new Pawn(this.player1.color)), new Tiles(new Pawn(this.player1.color)), new Tiles(new Pawn(this.player1.color)), new Tiles(new Pawn(this.player1.color)), new Tiles(new Pawn(this.player1.color)), new Tiles(new Pawn(this.player1.color)), new Tiles(new Pawn(this.player1.color))],
      [new Tiles(new Rook(this.player1.color)), new Tiles(new Knight(this.player1.color)), new Tiles(new Bishop(this.player1.color)), new Tiles(new King(this.player1.color)), new Tiles(new Queen(this.player1.color)), new Tiles(new Bishop(this.player1.color)), new Tiles(new Knight(this.player1.color)), new Tiles(new Rook(this.player1.color))],
    ]
    return this.board

  }

  drawBoard() {

    const $MODULE = document.querySelector('.chess');
    let bgcolor = "";
    $MODULE.innerHTML = ""
    for (let r = 0; r < this.board.length; r++) {
      for (var c = 0; c < this.board.length; c++) {
        let tile = this.board[r][c];
        if (r % 2 == 0) {
          bgcolor = ((c % 2 == 0 ? "#fff" : "#7d8796"));
        } else {
          bgcolor = ((c % 2 != 0 ? "#fff" : "#7d8796"));
        }

        $MODULE.append(tile.getTemplate(bgcolor));
        tile.coordinates.r = r;
        tile.coordinates.c = c;
      }
    }
  }

  setActivepiece(lastPieceClicked) {
    //clickar na mesma peça tem de remover o selected;
    // clickar nas peças da mesma cor tem de mudar o selected e remover o selected da propria;
    // clickar noutros tiles tem de ir para o respetivo tile;
    //se for peça inimiga come;
    //respetivas regras de movimento da peça;

    //first click
    if (!this.activeTile) {
      // clicke em tile vazio;
      if (lastPieceClicked.tile.piece == "" || lastPieceClicked.tile.piece == undefined) return;

      // clicke em peça inimiga;
      if (lastPieceClicked.tile.piece.color != this.activePlayer.color) return;

      // first click numa peça
      this.setActiveTile(lastPieceClicked)


    } else { //peça ja está selecionada

      //se clickar na mesma peça remove o selected
      if (this.activeTile == lastPieceClicked) {
        this.resetActiveTile();
        return
      }

      //se clickar em peça da mesma cor
      if (lastPieceClicked.tile.piece && lastPieceClicked.tile.piece.color == this.activePlayer.color && this.activeTile.tile.piece.color == this.activePlayer.color) {
        this.resetActiveTile();
        this.setActiveTile(lastPieceClicked);
        lastPieceClicked.tile.element.classList.add('selected');

        return
      }

      //se nao é um movimento valido return
      if (!lastPieceClicked.tile.possibleMoves) {
        lastPieceClicked.tile.possibleMoves = false;
        return
      }

      //comer a peça inimiga
      if (lastPieceClicked.tile.piece && lastPieceClicked.tile.piece.color != this.activePlayer.color) {
        delete lastPieceClicked.tile.piece;
      }

      this.activeTile.tile.piece.moveTo(lastPieceClicked.tile);
      this.activeTile.tile.piece = "";
      this.drawBoard();
      this.swapPlayer();
      this.resetActiveTile();

    }


  }

  setActiveTile(tile) {
    this.activeTile = tile;
    this.activeTile.tile.element.classList.add('selected');
    this.setPossibleMoves();
  }

  setPossibleMoves() {
    // this.activeTile.tile.piece.getPossibleMoves(this.activeTile.tile)

    const moves = this.activeTile.tile.piece.moves;
    let activeTile = this.activeTile.tile;
  
    

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

          if (this.board[_r][_c].piece.color == this.activePlayer.color) continue
            //se tiver ataque diferente
          if (this.activeTile.tile.piece.attack) {
          
            const attack = this.activeTile.tile.piece.attackMoves;
            for (var j = 0; j < attack.list.length; j++) {
              let r = attack.list[j][0],
                c = attack.list[j][1],
                Ar = activeTile.coordinates.r,
                Ac = activeTile.coordinates.c;
      
                Ac += c;
                Ar += r
             
                 if (this.isInBounds(Ac, Ar) && this.board[Ar][Ac].piece.color != this.activePlayer.color && this.board[Ar][Ac].hasPiece()) {
                  this.updateTileList(this.board[Ar][Ac]);
               
                  
                }
                
                if(!this.board[_r][_c].hasPiece()){

                  let tile = this.board[_r][_c];

                    this.updateTileList(tile);
                    continue;
                }
              
              }
            }else{
              let tile = this.board[_r][_c];

               this.updateTileList(tile);
               
            }
          
            continue;
        }

        // incrementa os tiles possiveis ate encontrar uma peça inimiga e enquanto houver tiles vazios;
        while (this.isInBounds(_c, _r) && (this.board[_r][_c].piece.color != this.activePlayer.color || !this.board[_r][_c].hasPiece())) {
          let tile = this.board[_r][_c];


          //se a peça foi inimiga acrescenta um possible move ao tile onde esta situado a peça inimiga
          if (this.isInBounds(_c, _r) && this.board[_r][_c].piece.color != this.activePlayer.color && this.board[_r][_c].hasPiece()) {
            this.updateTileList(tile);
            break;
          }


          this.updateTileList(tile);
          _c += c;
          _r += r;
        }
      }

    }

    
  }

  resetActiveTile() {

    for (var i = 0; i < this.activeTileList.length; i++) {
      this.activeTileList[i].element.classList.remove('selected')
      this.activeTileList[i].possibleMoves = false;
    }
    this.activeTile.tile.element.classList.remove('selected');

    this.activeTile = null;
  }

  swapPlayer() {
    if (this.activePlayer == this.player1) {
      this.activePlayer = this.player2
    } else {
      this.activePlayer = this.player1
    }
    console.log(this.activePlayer);
  }

  isInBounds(_c, _r) {
    return (_r >= 0 && _r <= this.board.length - 1) && (_c >= 0 && _c <= this.board[0].length - 1)
  }

  updateTileList(tile) {
    this.activeTileList.push(tile);
    tile.setPossibleMoves(true);
  }
  getKing(color) {
    for (let r = 0; r < this.board.length; r++) {
      for (var c = 0; c < this.board.length; c++) {
        let tile = this.board[r][c];
        if (tile.piece.name == "King" && tile.piece.color == color) {

          return tile.piece;
        }
      }
    }
  }
  events() {
    document.addEventListener("onTileClick", (e) => {
      this.setActivepiece(e.detail);

    });
  }

}


export default Board;