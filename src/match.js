import exists from './exists';
import GameState from './game_state';

class Match {
  constructor(args) {
    this.id = args.id
    this.gameState = new GameState(args.game_state)
    this.players = args.players
    this.winner = args.winner
  }

  squares() {
    return this.gameState.squares;
  }

  selectedSquare() {
    return this.gameState.selectedSquare();
  }

  findSquareById(id) {
    return this.gameState.findSquareById(id);
  }

  playersTurn(playerNumber) {
    return this.gameState.playersTurn(playerNumber);
  }

  playersName(number) {
    let index = number - 1;
    return this.players[index].name;
  }

  currentPlayerName() {
    return this.playersName(this.gameState.currentPlayerNumber);
  }

  winnerName() {
    if (exists(this.winner)) {
      return this.playersName(this.winner);
    } else {
      return null;
    }
  }

  // move calculations

  movePossible(fromId) {
    return this.gameState.movePossible(fromId);
  }

  moveValid(fromId, toIds, proposedToId) {
    return this.gameState.moveValid(fromId, toIds, proposedToId);
  }

  moveComplete(fromId, toIds, proposedToId) {
    return this.gameState.moveComplete(fromId, toIds, proposedToId);
  }
}

export default Match;
