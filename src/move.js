import eachCons from './each_cons'
import Vector from './vector'

class Move {
  constructor(args) {
    this.fromId = args.fromId;
    this.toIds = args.toIds;
    this.proposedToId = args.proposedToId;
    this.gameState = args.gameState;
    this.error = null;
  }
 
  possible() {
    let fromSquare = this.gameState.findSquareById(this.fromId);
    if (fromSquare.selectable(this.gameState.squares)) {
      this.error = null;
    } else {
      this.error = { name: 'CannotMoveError', message: 'This piece cannot move' };
    } 
    return this.error === null;
  }

  valid() {
    let fromSquare = this.gameState.findSquareById(this.fromId);
    let toSquares = this.gameState.findSquareById(this.toIds);
    let proposedToSquare = this.gameState.findSquareById(this.proposedToId);
    let legs = this._legs(fromSquare, toSquares, proposedToSquare);

    let allLegsActionable = eachCons(legs,2).every((leg) => {
      return leg[0].actionable(fromSquare.piece, leg[1], this.gameState.squares);
    });

    if (allLegsActionable) {
      this.error = null;
    } else {
      this.error = { name: 'CannotMoveError', message: 'This piece cannot move that way' };
    }

    return this.error === null;
  }

  complete() {
    let fromSquare = this.gameState.findSquareById(this.fromId);
    let toSquares = this.gameState.findSquareById(this.toIds);
    let proposedToSquare = this.gameState.findSquareById(this.proposedToId);
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
    return lastSquare.possibleJumps(piece, this.gameState.squares).difference(toSquares).empty();
  }
}

export default Move
