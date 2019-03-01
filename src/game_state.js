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
    let from = this.findSquareById(fromId);
    let move = new Move({from: from, gameState: this});
    return move.possible();
  }

  moveValid(fromId, toIds, proposedToId) {
    let from = this.findSquareById(fromId);
    let tos = this.findSquareById(toIds);
    let proposedTo = this.findSquareById(proposedToId);

    let move = new Move({from: from, tos: tos, proposedTo: proposedTo, gameState: this});
    return move.valid();
  }

  moveComplete(fromId, toIds, proposedToId) {
    let from = this.findSquareById(fromId);
    let tos = this.findSquareById(toIds);
    let proposedTo = this.findSquareById(proposedToId);

    let move = new Move({from: from, tos: tos, proposedTo: proposedTo, gameState: this});
    return move.complete();
  }
};

export default GameState;
