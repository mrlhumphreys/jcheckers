import { exists } from './utils';
import Vector from './vector';
import Square from './square';

class SquareSet {
  constructor(args) {
    this.constructorName = 'SquareSet';
    this.squares = args.squares.map(function(s) {
      return (s.constructorName === 'Square') ? s : new Square(s);
    });
  }

  get asJson() {
    return {
      squares: this.squares.map(function(square) { return square.asJson; })
    };
  }

  findSquareById(id) {
    if (!exists(id)) {
      return undefined;
    } else if (id.constructor.name === "Array") {
      let _squares = id.map((i) => {
        return this.findSquareById(i);
      }).filter((s) => { 
        return exists(s); 
      });
      return new SquareSet({"squares": _squares});
    } else {
      return this.filter(function(s) {
        return s.id === id;
      }).first;
    }
  }

  findSquare(x, y) {
    return this.squares.filter(function(s) {
      return (s.x === x) && (s.y === y);
    })[0];
  }

  get selectedSquare() {
    return this.squares.filter(function(s) {
      return (exists(s.piece) && s.piece.selected);
    })[0];
  }

  push(square) {
    this.squares.push(square);
  }

  get length() {
    return this.squares.length;
  }

  map(callback) {
    return this.squares.map(callback);
  }

  include(square) {
    return exists(square) && this.squares.some(function(s) {
      return square.point.eq(s.point);
    });
  }

  difference(squareSet) {
    let _squares = this.squares.filter(function(a) {
      return squareSet.squares.filter(function(b) {
        return a.point.eq(b.point);
      }).length === 0
    });
    return new SquareSet({"squares": _squares});
  }

  get first() {
    return this.squares[0];
  }

  get last() {
    return this.squares.slice(-1)[0];
  }

  get many() {
    return this.squares.length > 1;
  }

  get any() {
    return (this.squares.length > 0);
  }

  get empty() {
    return this.squares.length === 0;
  }

  filter(callback) {
    let _squares = this.squares.filter(callback);
    return new SquareSet({"squares": _squares});
  }

  allMovesForPlayer(playerNumber) {
    let playerSquares = this.occupiedBy(playerNumber);
    let jumps = playerSquares.allPossibleJumps(this); 
    let moves = playerSquares.allPossibleMoves(this); 
    return (jumps.any ? jumps : moves);
  }

  allPossibleMoves(squares) {
    return this.filter((s) => {
      return s.possibleMoves(s.piece, squares).any;
    });
  }

  allPossibleJumps(squares) {
    return this.filter((s) => {
      return s.possibleJumps(s.piece, squares).any;
    });
  }

  occupiedByOpponentOf(playerNumber) {
    return this.filter(function(s) {
      return s.occupiedByOpponentOf(playerNumber);
    });
  }

  occupiedBy(playerNumber) {
    return this.filter(function(s) {
      return s.occupiedBy(playerNumber);
    });
  }

  squaresAwayFrom(number, from) {
    return this.filter((s) => {
      return (new Vector(s, from)).distance === number;
    });
  }

  twoSquaresAwayFrom(from) {
    return this.squaresAwayFrom(2, from);
  }

  oneSquareAwayFrom(from) {
    return this.squaresAwayFrom(1, from);
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

  get occupied() {
    return this.filter(function(s) {
      return s.occupied;
    });
  }

  get unoccupied() {
    return this.filter(function(s) {
      return s.unoccupied;
    });
  }

  between(a, b) {
    let vector = new Vector(a, b);
    let squares = [];

    if (vector.diagonal) {
      let pointCounter = a.point;
      let direction = vector.direction;
      squares = [];

      while (pointCounter.notEq(b.point)) {
        pointCounter = pointCounter.add(direction);
        let square = this.findSquare(pointCounter.x, pointCounter.y);

        if (exists(square) && square.point.notEq(b.point)) {
          squares.push(square);
        }
      }
    } else {
      squares = [];
    }
    return new SquareSet({"squares": squares});
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
