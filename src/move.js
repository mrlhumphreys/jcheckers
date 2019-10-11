import eachCons from './each_cons'
import exists from './exists'
import Vector from './vector'

class Move {
  constructor(args) {
    this.playerNumber = args.playerNumber;
    this.touchedSquareId = args.touchedSquareId;
    this.match = args.match;
  }

  get result() {
    if (this._gameOver) {
      return this._gameOverResult; 
    }
    if (this._notPlayersTurn) {
      return this._notPlayersTurnResult;
    }

    if (exists(this.match.gameState.selectedSquare)) {
      if (this._moveValid) {
        if (this._moveComplete) {
          return this._moveCompleteResult;
        } else {
          return this._moveIncompleteResult;
        }
      } else {
        return this._moveInvalidResult;
      }
    } else {
      if (this._emptySquare) {
        return this._emptySquareResult;
      }
      if (this._notPlayersPiece) {
        return this._notPlayersPieceResult;
      }
      if (this._movePossible) {
        return this._movePossibleResult;
      } else {
        return this._moveImpossibleResult;
      }
    }
  }

  get _gameOverResult() {
    return { name: 'GameOver', message: 'Game is over.' };
  }

  get _gameOver() {
    return exists(this.match.winner);
  } 

  get _notPlayersTurnResult() {
    return { name: 'NotPlayersTurn', message: 'It is not your turn.' };
  }

  get _notPlayersTurn() {
    return !this.match.gameState.playersTurn(this.playerNumber);
  } 

  get _movePossibleResult() {
    return { name: 'MovePossible', message: '' };
  }

  get _movePossible() {
    return this._touchedSquare.selectable(this.match.gameState.squares);
  } 

  get _moveImpossibleResult() {
    return { name: 'MoveImpossible', message: 'That piece cannot move.' };
  }

  get _notPlayersPieceResult() {
    return { name: 'NotPlayersPiece', message: 'That piece is not yours.' };
  }

  get _notPlayersPiece() {
    return this._touchedSquare.piece.playerNumber !== this.playerNumber; 
  } 

  get _emptySquareResult() {
    return { name: 'EmptySquare', message: 'That square is empty.' };
  }

  get _emptySquare() {
    return !exists(this._touchedSquare.piece); 
  } 

  get _moveCompleteResult() {
    return { name: 'MoveComplete', message: '' };
  }

  get _moveIncompleteResult() {
    return { name: 'MoveIncomplete', message: 'Piece can still jump.' };
  }

  get _moveComplete() {
    let legs = this._legs(this._from, this._tos, this._touchedSquare);
    let lastLeg = this._lastLeg(legs);

    return (this._moveType(lastLeg) || (this._jumpType(lastLeg) && this._lastLegEnd(this._from.piece, this._touchedSquare, this._tos)));
  }

  get _moveInvalidResult() {
    return { name: 'MoveInvalid', message: 'Move is invalid.' };
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
