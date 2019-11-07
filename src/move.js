import { eachCons, exists } from './utils'
import Vector from './vector'

class Move {
  constructor(args) {
    this.playerNumber = args.playerNumber;
    this.touchedSquareId = args.touchedSquareId;
    this.match = args.match;
  }

  get result() {
    if (this._gameOver) {
      return { name: 'GameOver', message: 'Game is over.' };
    }
    if (this._notPlayersTurn) {
      return { name: 'NotPlayersTurn', message: 'It is not your turn.' };
    }

    if (exists(this.match.gameState.selectedSquare)) {
      if (this._moveValid) {
        if (this._moveComplete) {
          return { name: 'MoveComplete', message: '' };
        } else {
          return { name: 'MoveIncomplete', message: 'Piece can still jump.' };
        }
      } else {
        return { name: 'MoveInvalid', message: 'Move is invalid.' };
      }
    } else {
      if (this._emptySquare) {
        return { name: 'EmptySquare', message: 'That square is empty.' };
      }
      if (this._notPlayersPiece) {
        return { name: 'NotPlayersPiece', message: 'That piece is not yours.' };
      }
      if (this._movePossible) {
        return { name: 'MovePossible', message: '' };
      } else {
        return { name: 'MoveImpossible', message: 'That piece cannot move.' };
      }
    }
  }

  get _gameOver() {
    return exists(this.match.winner);
  } 

  get _notPlayersTurn() {
    return !this.match.gameState.playersTurn(this.playerNumber);
  } 

  get _movePossible() {
    return this._touchedSquare.selectable(this.match.gameState.squares);
  } 

  get _notPlayersPiece() {
    return this._touchedSquare.piece.playerNumber !== this.playerNumber; 
  } 

  get _emptySquare() {
    return !exists(this._touchedSquare.piece); 
  } 

  get _moveComplete() {
    let legs = this._legs(this._from, this._tos, this._touchedSquare);
    let lastLeg = this._lastLeg(legs);

    return (this._moveType(lastLeg) || (this._jumpType(lastLeg) && this._lastLegEnd(this._from.piece, this._touchedSquare, this._tos)));
  }

  get _moveValid() {
    let legs = this._legs(this._from, this._tos, this._touchedSquare);

    return eachCons(legs,2).every((leg) => {
      return leg[0].actionable(this._from.piece, leg[1], this.match.gameState.squares);
    });
  }
 
  get _touchedSquare() {
    return this.match.gameState.findSquareById(this.touchedSquareId);
  }

  get _from() {
    return this.match.gameState.findSquareById(this.match.currentMoveFromId);
  }

  get _tos() {
    return this.match.gameState.findSquareById(this.match.currentMoveToIds);
  }

  get _touchedSquare() {
    return this.match.gameState.findSquareById(this.touchedSquareId);
  }

  _legs(fromSquare, toSquares, touchedSquare) {
    return [fromSquare].concat(toSquares.squares).concat([touchedSquare]);
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
    return lastSquare.possibleJumps(piece, this.match.gameState.squares).difference(toSquares).empty;
  }
}

export default Move
