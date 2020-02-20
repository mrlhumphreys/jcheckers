import { exists } from './utils';
import Point from './point';
import Piece from './piece';

//** A square on a grid **/
class Square {
  /**
   * Create a Square
   * @param {Object} args - The properties of the square.
   * @param {number} args.id - The unique identifier of the square.
   * @param {number} args.x - The x co-ordinate of the square.
   * @param {number} args.y - The y co-ordinate of the square.
   * @param {boolean} [args.marked=false] - Is the square marked for a jump?
   * @param {(Object|null)} [args.piece=null] - The piece on the square. 
   */
  constructor(args) {
    /** @member {string} */
    this.constructorName = 'Square';

    /** @member {number} */
    this.id = args.id;

    /** @member {number} */
    this.x = args.x;

    /** @member {number} */
    this.y = args.y;

    /** @member {boolean} */
    this.marked = exists(args.marked) ? args.marked : false;

    /** @member {(Piece|null)} */
    this.piece = exists(args.piece) ? new Piece(args.piece) : null;
  }

  /**
   * Serialize the square as a simple object.
   * @return {Object} The serialized object.
   */
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

  /**
   * The player who occupies the square.
   * Returns null if unoccupied.
   * @return {(number|null)} The player number.
   */
  get player() {
    return exists(this.piece) ? this.piece.player : null;
  }

  /**
   * Can this square be selected?
   * @param {SquareSet} squares - The board state.
   * @return {boolean} The result.
   */
  selectable(squares) {
    if (exists(this.piece)) {
      if (squares.occupiedByPlayer(this.piece.playerNumber).allPossibleJumps(squares).some()) {
        return this.possibleJumps(this.piece, squares).some();
      } else {
        return this.possibleMoves(this.piece, squares).some();
      }
    } else {
      return false;
    }
  }

  /**
   * Can the piece move to the square on the board?
   * @param {Piece} piece - The piece that is moving.
   * @param {Square} to - The square the piece is moving to.
   * @param {SquareSet} squares - The board state.
   * @return {boolean} The result.
   */
  actionable(piece, to, squares) {
    let noPossibleJumps = this.possibleJumps(piece, squares).none();
    let canMoveToTo = this.possibleMoves(piece, squares).includes(to);
    let canJumpToTo = this.possibleJumps(piece, squares).includes(to);
    return (noPossibleJumps && canMoveToTo) || canJumpToTo;
  }

  /**
   * All possible squares the piece can move to.
   * @param {Piece} piece - The piece that is moving.
   * @param {SquareSet} squares - The board state.
   * @return {SquareSet} The possible squares the piece can move to.
   */
  possibleMoves(piece, squares) {
    return squares.squaresAwayFrom(1, this).inDirectionOf(piece, this).unoccupied();
  }

  /**
   * All possible squares the piece can jump to.
   * @param {Piece} piece - The piece that is moving.
   * @param {SquareSet} squares - The board state.
   * @return {SquareSet} The possible squares the piece can jump to.
   */
  possibleJumps(piece, squares) {
    return squares.squaresAwayFrom(2, this).inDirectionOf(piece, this).unoccupied().filter((s) => {
      return squares.between(this, s).occupiedByOpponentOf(piece.playerNumber).some();
    });
  }

  /**
   * Is the square occupied?
   * @return {boolean} The result.
   */
  get occupied() {
    return this.piece != null;
  }

  /**
   * Is the square occupied by the player?
   * @param {number} playerNumber - The player in question.
   * @return {boolean} The result.
   */
  occupiedByPlayer(playerNumber) {
    return exists(this.piece) && (this.piece.playerNumber === playerNumber);
  }

  /**
   * Is the square occupied by the opponent of player?
   * @param {number} playerNumber - The player in question.
   * @return {boolean} The result.
   */
  occupiedByOpponentOf(playerNumber) {
    return exists(this.piece) && (this.piece.playerNumber != playerNumber);
  }

  /**
   * Is the square unoccupied? 
   * @return {boolean} The result.
   */
  get unoccupied() {
    return this.piece === null;
  }

  /**
   * The point based on the square's position
   * @return {Point} The square's point.
   */
  get point() {
    return new Point(this.x, this.y);
  }

  /**
   * The y co-ordinate of the last rank of the player.
   * @param {number} playerNumber - The player's number.
   * @return {number} The last rank of the player. 
   */
  lastRankForPlayer(playerNumber) {
    return (playerNumber === 1 && this.y === 7) || (playerNumber === 2 && this.y === 0);
  }

  // actions

  /**
   * Select the piece.
   * @return {boolean} The result.
   */
  select() {
    if (exists(this.piece)) {
      return this.piece.select();
    } else {
      return false;
    }
  }

  /**
   * Deselect the piece.
   * @return {boolean} The result.
   */
  deselect() {
    if (exists(this.piece)) {
      return this.piece.deselect();
    } else {
      return false;
    }
  }

  /**
   * Mark the square.
   * @return {boolean} The result.
   */
  mark() {
    this.marked = true;
    return true;
  }

  /**
   * Unmark the square.
   * @return {boolean} The result.
   */
  unmark() {
    this.marked = false;
    return true;
  }

  /**
   * Promote the piece.
   * @return {boolean} The result.
   */
  promote() {
    if (exists(this.piece)) {
      return this.piece.promote();
    } else {
      return false;
    }
  }
}

export default Square;
