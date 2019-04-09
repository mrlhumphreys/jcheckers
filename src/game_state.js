import eachCons from './each_cons'
import exists from './exists'
import SquareSet from './square_set'

class GameState {
  constructor(args) {
    this.currentPlayerNumber = args.current_player_number;
    this.squares = new SquareSet({"squares": args.squares});
  }

  get asJson() {
    return {
      current_player_number: this.currentPlayerNumber,
      squares: this.squares.asJson.squares 
    };
  }

  get selectedSquare() {
    return this.squares.selectedSquare;
  }

  findSquareById(id) {
    return this.squares.findSquareById(id);
  }

  playersTurn(playerNumber) {
    return (this.currentPlayerNumber === playerNumber);
  }

  // actions

  selectSquare(squareId) {
    let square = this.findSquareById(squareId);
    if (exists(square)) {
      square.select();
    }
  }

  deselectSquares() {
    this.squares.deselectSquares();
  }

  markSquare(squareId) {
    let square = this.findSquareById(squareId);
    if (exists(square)) {
      square.mark();
    } 
  }

  movePieces(fromId, toIds) {
    let from = this.findSquareById(fromId);
    let tos = this.findSquareById(toIds);
    let piece = from.piece; 
    let legs = [];

    if (tos.constructorName === "SquareSet") {
      tos.last.piece = piece;
      legs = [from].concat(tos.squares);
    } else {
      tos.piece = piece;
      legs = [from].concat(tos);
    }

    from.piece = null;

    eachCons(legs,2).forEach((leg) => {
      let between = this.squares.between(leg[0], leg[1]).first; 
      if (exists(between)) {
        between.piece = null;
      }
    });
  }
};

export default GameState;
