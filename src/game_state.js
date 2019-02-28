import SquareSet from './square_set'
import Move from './move'

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

  // move calculations

  movePossible(fromId) {
    let move = new Move({fromId: fromId, gameState: this});
    return move.possible();
  }

  moveValid(fromId, toIds, proposedToId) {
    let move = new Move({fromId: fromId, toIds: toIds, proposedToId: proposedToId, gameState: this});
    return move.valid();
  }

  moveComplete(fromId, toIds, proposedToId) {
    let move = new Move({fromId: fromId, toIds: toIds, proposedToId: proposedToId, gameState: this});
    return move.complete();
  }
};

export default GameState;
