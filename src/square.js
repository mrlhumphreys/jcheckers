import exists from './exists';
import Point from './point';
import Piece from './piece';

class Square {
  constructor(args) {
    this.constructorName = 'Square';
    this.id = args.id;
    this.x = args.x;
    this.y = args.y;
    this.piece = exists(args.piece) ? new Piece(args.piece) : null;
    this.marked = false;
  }

  mark() {
    this.marked = true;
  }

  player() {
    return exists(this.piece) ? this.piece.player : null;
  }

  selectable(squares) {
    if (exists(this.piece)) {
      if (squares.occupiedBy(this.piece.playerNumber).allPossibleJumps(squares).any()) {
        return this.possibleJumps(this.piece, squares).any();
      } else {
        return this.possibleMoves(this.piece, squares).any();
      }
    } else {
      return false;
    }
  }

  actionable(piece, to, squares) {
    let noPossibleJumps = this.possibleJumps(piece, squares).empty();
    let canMoveToTo = this.possibleMoves(piece, squares).include(to);
    let canJumpToTo = this.possibleJumps(piece, squares).include(to);
    return (noPossibleJumps && canMoveToTo) || canJumpToTo;
  }

  possibleMoves(piece, squares) {
    return squares.oneSquareAwayFrom(this).inDirectionOf(piece, this).unoccupied();
  }

  possibleJumps(piece, squares) {
    return squares.twoSquaresAwayFrom(this).inDirectionOf(piece, this).unoccupied().filter((s) => {
      return squares.between(this, s).occupiedByOpponentOf(piece.playerNumber).any();
    });
  }

  occupied() {
    return this.piece != null;
  }

  unoccupied() {
    return this.piece == null;
  }

  point() {
    return new Point(this.x, this.y);
  }
}

export default Square;
