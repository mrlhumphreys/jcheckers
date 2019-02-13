import eachCons from './each_cons';
import exists from './exists';
import Vector from './vector';
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
    let fromSquare = this.findSquareById(fromId);
    return fromSquare.selectable(this.squares());
  }

  moveValid(fromId, toIds, proposedToId) {
    let fromSquare = this.findSquareById(fromId);
    let toSquares = this.findSquareById(toIds);
    let proposedToSquare = this.findSquareById(proposedToId);
    let legs = this._legs(fromSquare, toSquares, proposedToSquare);

    return eachCons(legs,2).every((leg) => {
      return leg[0].actionable(fromSquare.piece, leg[1], this.squares());
    });
  }

  moveComplete(fromId, toIds, proposedToId) {
    let fromSquare = this.findSquareById(fromId);
    let toSquares = this.findSquareById(toIds);
    let proposedToSquare = this.findSquareById(proposedToId);
    let legs = this._legs(fromSquare, toSquares, proposedToSquare);
    let lastLeg = this._lastLeg(legs);

    return (this._moveType(lastLeg) || (this._jumpType(lastLeg) && this._lastLegEnd(fromSquare.piece, proposedToSquare, toSquares)));
  }

  _legs(fromSquare, toSquares, proposedToSquare) {
    return [fromSquare].concat(toSquares.squares).concat([proposedToSquare]);
  }

  _lastLeg(legs) {
    let a = legs.slice(-2, -1)[0];
    let b = legs.slice(-1)[0];
    return new Vector(a, b);
  }

  _moveType(leg) {
    return leg.distance() == 1;
  }

  _jumpType(leg) {
    return leg.distance() == 2;
  }

  _lastLegEnd(piece, lastSquare, toSquares) {
    return lastSquare.possibleJumps(piece, this.squares()).difference(toSquares).empty();
  }
}

export default Match;
