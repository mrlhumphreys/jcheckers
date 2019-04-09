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
 
  get possible() {
    if (this._from.selectable(this.gameState.squares)) {
      this.error = null;
    } else {
      this.error = { name: 'CannotMoveError', message: 'This piece cannot move' };
    } 
    return this.error === null;
  }

  get valid() {
    let legs = this._legs(this._from, this._tos, this._proposedTo);

    let allLegsActionable = eachCons(legs,2).every((leg) => {
      return leg[0].actionable(this._from.piece, leg[1], this.gameState.squares);
    });

    if (allLegsActionable) {
      this.error = null;
    } else {
      this.error = { name: 'CannotMoveError', message: 'This piece cannot move that way' };
    }

    return this.error === null;
  }

  get complete() {
    let legs = this._legs(this._from, this._tos, this._proposedTo);
    let lastLeg = this._lastLeg(legs);

    return (this._moveType(lastLeg) || (this._jumpType(lastLeg) && this._lastLegEnd(this._from.piece, this._proposedTo, this._tos)));
  }

  get _from() {
    return this.gameState.findSquareById(this.fromId);
  }

  get _tos() {
    return this.gameState.findSquareById(this.toIds);
  }

  get _proposedTo() {
    return this.gameState.findSquareById(this.proposedToId);
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
    return leg.distance === 1;
  }

  _jumpType(leg) {
    return leg.distance === 2;
  }

  _lastLegEnd(piece, lastSquare, toSquares) {
    return lastSquare.possibleJumps(piece, this.gameState.squares).difference(toSquares).empty;
  }
}

export default Move
