import exists from './exists';
import Point from './point';
import Piece from './piece';

class Square {
  constructor(args) {
    this.constructorName = 'Square';
    this.id = args.id;
    this.x = args.x;
    this.y = args.y;
    this.marked = false;
    this.piece = exists(args.piece) ? new Piece(args.piece) : null;
  }

  get asJson() {
    let pieceJson = exists(this.piece) ? this.piece.asJson : null;
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      marked: this.marked,
      piece: pieceJson 
    };
  }

  get player() {
    return exists(this.piece) ? this.piece.player : null;
  }

  selectable(squares) {
    if (exists(this.piece)) {
      if (squares.occupiedBy(this.piece.playerNumber).allPossibleJumps(squares).any) {
        return this.possibleJumps(this.piece, squares).any;
      } else {
        return this.possibleMoves(this.piece, squares).any;
      }
    } else {
      return false;
    }
  }

  actionable(piece, to, squares) {
    let noPossibleJumps = this.possibleJumps(piece, squares).empty;
    let canMoveToTo = this.possibleMoves(piece, squares).include(to);
    let canJumpToTo = this.possibleJumps(piece, squares).include(to);
    return (noPossibleJumps && canMoveToTo) || canJumpToTo;
  }

  possibleMoves(piece, squares) {
    return squares.oneSquareAwayFrom(this).inDirectionOf(piece, this).unoccupied;
  }

  possibleJumps(piece, squares) {
    return squares.twoSquaresAwayFrom(this).inDirectionOf(piece, this).unoccupied.filter((s) => {
      return squares.between(this, s).occupiedByOpponentOf(piece.playerNumber).any;
    });
  }

  get occupied() {
    return this.piece != null;
  }

  occupiedBy(playerNumber) {
    return exists(this.piece) && (this.piece.playerNumber === playerNumber);
  }

  occupiedByOpponentOf(playerNumber) {
    return exists(this.piece) && (this.piece.playerNumber != playerNumber);
  }

  get unoccupied() {
    return this.piece === null;
  }

  get point() {
    return new Point(this.x, this.y);
  }

  // actions

  select() {
    if (exists(this.piece)) {
      this.piece.select();
    } 
  }

  deselect() {
    if (exists(this.piece)) {
      this.piece.deselect();
    }
  }

  mark() {
    this.marked = true;
  }
}

export default Square;
