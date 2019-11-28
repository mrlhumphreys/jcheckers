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
    this.asJson = squaresAsJson;
    this.findById = findById;
    this.findByCoordinate = findByCoordinate;
    this.selected = selected;
    this.length = length;
    this.map = map;
    this.includes = includes;
    this.difference = difference;
    this.first = first;
    this.last = last;
    this.many = many;
    this.some = some;
    this.none = none;
    this.filter = filter;
    this.occupiedByOpponentOf = occupiedByOpponentOf;
    this.occupiedByPlayer = occupiedByPlayer;
    this.occupied = occupied;
    this.unoccupied = unoccupied;
    this.squaresAwayFrom = squaresAwayFrom;
    this.twoSquaresAwayFrom = twoSquaresAwayFrom;
    this.oneSquareAwayFrom = oneSquareAwayFrom;
    this.between = between;
  }

  push(square) {
    this.squares.push(square);
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
