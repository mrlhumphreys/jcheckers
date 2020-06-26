import { exists } from './utils';
import { 
  findById, 
  findByCoordinate, 
  selected, 
  length,
  map, 
  squaresAsJson, 
  includes, 
  difference,
  first,
  last,
  many,
  some,
  none,
  filter,
  push,
  occupiedByOpponentOf,
  occupiedByPlayer,
  occupied,
  unoccupied,
  squaresAwayFrom,
  twoSquaresAwayFrom,
  oneSquareAwayFrom,
  between
} from '@mrlhumphreys/jboardgame';
import Vector from './vector';
import Square from './square';

//** A set of Squares **/
class SquareSet {
  /**
   * Create a SquareSet
   * @param {Object} args - The properties of a square set.
   * @param {Object[]} args.squares - An array of square properties.
   */
  constructor(args) {
    /** @member {string} */
    this.constructorName = 'SquareSet';

    /** @member {Square[]} */
    this.squares = args.squares.map(function(s) {
      if (s.constructorName === 'Square') {
        return s;
      } else {
        return new Square(s);
      }
    });

    /** @member {Function} */
    this.asJson = squaresAsJson;

    /** @member {Function} */
    this.findById = findById;

    /** @member {Function} */
    this.findByCoordinate = findByCoordinate;

    /** @member {Function} */
    this.selected = selected;

    /** @member {Function} */
    this.length = length;

    /** @member {Function} */
    this.map = map;

    /** @member {Function} */
    this.includes = includes;

    /** @member {Function} */
    this.difference = difference;

    /** @member {Function} */
    this.first = first;

    /** @member {Function} */
    this.last = last;

    /** @member {Function} */
    this.many = many;

    /** @member {Function} */
    this.some = some;

    /** @member {Function} */
    this.none = none;

    /** @member {Function} */
    this.filter = filter;

    /** @member {Function} */
    this.push = push;

    /** @member {Function} */
    this.occupiedByOpponentOf = occupiedByOpponentOf;

    /** @member {Function} */
    this.occupiedByPlayer = occupiedByPlayer;

    /** @member {Function} */
    this.occupied = occupied;

    /** @member {Function} */
    this.unoccupied = unoccupied;

    /** @member {Function} */
    this.squaresAwayFrom = squaresAwayFrom;

    /** @member {Function} */
    this.twoSquaresAwayFrom = twoSquaresAwayFrom;

    /** @member {Function} */
    this.oneSquareAwayFrom = oneSquareAwayFrom;
    
    /** @member {Function} */
    this.between = between;
  }

  /**
   * All possible moves/jumps on the board for player.
   * Returns jumps if there is at least one jump.
   * @param {number} playerNumber - The player's number.
   * @return {SquareSet} All possible moves/jumps for the player.
   */
  allMovesForPlayer(playerNumber) {
    let playerSquares = this.occupiedByPlayer(playerNumber);
    let jumps = playerSquares.allPossibleJumps(this); 
    let moves = playerSquares.allPossibleMoves(this); 
    return (jumps.some() ? jumps : moves);
  }

  /**
   * All possible moves for specified squares.
   * @param {SquareSet} squares - The specified squares.
   * @return {SquareSet} All possible moves.
   */
  allPossibleMoves(squares) {
    return this.filter((s) => {
      return s.possibleMoves(s.piece, squares).some();
    });
  }

  /**
   * All possible jumps for specified squares.
   * @param {SquareSet} squares - The specified squares.
   * @return {SquareSet} All possible jumps.
   */
  allPossibleJumps(squares) {
    return this.filter((s) => {
      return s.possibleJumps(s.piece, squares).some();
    });
  }

  /**
   * Squares in the direction of the piece on from.
   * @param {Piece} piece - The specified piece.
   * @param {Square} from - Where the square is.
   * @return {SquareSet} Squares in the direction of the piece on from.
   */
  inDirectionOf(piece, from) {
    return this.filter(function(s) {
      if (exists(piece)) {
        if (piece.king) {
          return true;
        } else {
          return (new Vector(from, s)).directionY === piece.direction;
        }
      } else {
        return false;
      }
    });
  }

  // actions

  /**
   * Deselect all squares.
   * @return {boolean} The result.
   */
  deselectSquares() {
    this.squares.forEach(function(square) { square.deselect(); });
    return true;
  }

  /**
   * Unmark all squares.
   * @return {boolean} The result.
   */
  unmarkSquares() {
    this.squares.forEach(function(square) { square.unmark(); });
    return true;
  }
}

export default SquareSet;
