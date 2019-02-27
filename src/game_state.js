import SquareSet from './square_set'
import Vector from './vector'
import eachCons from './each_cons'

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
    let fromSquare = this.findSquareById(fromId);
    return fromSquare.selectable(this.squares);
  }

  moveValid(fromId, toIds, proposedToId) {
    let fromSquare = this.findSquareById(fromId);
    let toSquares = this.findSquareById(toIds);
    let proposedToSquare = this.findSquareById(proposedToId);
    let legs = this._legs(fromSquare, toSquares, proposedToSquare);

    return eachCons(legs,2).every((leg) => {
      return leg[0].actionable(fromSquare.piece, leg[1], this.squares);
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
    return lastSquare.possibleJumps(piece, this.squares).difference(toSquares).empty();
  }
};

export default GameState;
