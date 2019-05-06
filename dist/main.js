import Board from '../helpers/Board.js';

const Chess = (function () {
  const $Module = document.querySelector('.chess');
  const init = () => {
    const board= new Board();
   events();
  }
  const events = () => {

  }


 return{
   init: init,

 }
}());
Chess.init();
console.log(Chess);

import Chess from '../Classes/Chess.js'


var chess = new Chess();

  
