import SquareSet from './square_set';

class GameState {
  constructor(args) {
    this.currentPlayerNumber = args.current_player_number;
    this.squares = new SquareSet({"squares": args.squares});
  }

  selectedSquare() {
    return this.squares.selectedSquare();
  }

  findSquareById(id) {
    return this.squares.findSquareById(id);
  }

  playersTurn(playerNumber) {
    return (this.currentPlayerNumber == playerNumber);
  }
};

export default GameState;
