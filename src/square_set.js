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

class SquareSet {
  constructor(args) {
    this.constructorName = 'SquareSet';
    this.squares = args.squares.map(function(s) {
      if (s.constructorName === 'Square') {
        return s;
      } else {
        return new Square(s);
      }
    });
  }

  get asJson() {
    return squaresAsJson(this);
  }

  findSquareById(id) {
    return findById(this, id);
  }

  findSquare(x, y) {
    return findByCoordinate(this, x, y);
  }

  get selectedSquare() {
    return selected(this);
  }

  push(square) {
    this.squares.push(square);
  }

  get length() {
    return length(this);
  }

  map(callback) {
    return map(this, callback);
  }

  includes(square) {
    return includes(this, square);
  }

  difference(squareSet) {
    return difference(this, squareSet);
  }

  get first() {
    return first(this);
  }

  get last() {
    return last(this);
  }

  get many() {
    return many(this);
  }

  some(callback) {
    return some(this, callback);
  }

  none(callback) {
    return none(this, callback);
  }

  filter(callback) {
    return filter(this, callback);
  }

  occupiedByOpponentOf(playerNumber) {
    return occupiedByOpponentOf(this, playerNumber);
  }

  occupiedByPlayer(playerNumber) {
    return occupiedByPlayer(this, playerNumber);
  }

  get occupied() {
    return occupied(this);
  }

  get unoccupied() {
    return unoccupied(this);
  }

  squaresAwayFrom(number, from) {
    return squaresAwayFrom(this, number, from);
  }

  twoSquaresAwayFrom(from) {
    return twoSquaresAwayFrom(this, from);
  }

  oneSquareAwayFrom(from) {
    return oneSquareAwayFrom(this, from);
  }

  between(a, b) {
    return between(this, a, b);
  }

  allMovesForPlayer(playerNumber) {
    let playerSquares = this.occupiedByPlayer(playerNumber);
    let jumps = playerSquares.allPossibleJumps(this); 
    let moves = playerSquares.allPossibleMoves(this); 
    return (jumps.some() ? jumps : moves);
  }

  allPossibleMoves(squares) {
    return this.filter((s) => {
      return s.possibleMoves(s.piece, squares).some();
    });
  }

  allPossibleJumps(squares) {
    return this.filter((s) => {
      return s.possibleJumps(s.piece, squares).some();
    });
  }

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

  deselectSquares() {
    this.squares.forEach(function(square) { square.deselect(); });
  }

  unmarkSquares() {
    this.squares.forEach(function(square) { square.unmark(); });
  }
}

export default SquareSet;
