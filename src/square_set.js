import exists from './exists';
import Vector from './vector';
import Square from './square';

class SquareSet {
  constructor(args) {
    this.constructorName = 'SquareSet';
    this.squares = args.squares.map(function(s) {
      return (s.constructorName == 'Square') ? s : new Square(s);
    });
  }

  findSquareById(id) {
    if (id.constructor.name == "Array") {
      let _squares = id.map((i) => {
        return this.findSquareById(i);
      });
      return new SquareSet({"squares": _squares});
    } else {
      return this.filter(function(s) {
        return s.id == id;
      }).first();
    }
  }

  findSquare(x, y) {
    return this.squares.filter(function(s) {
      return (s.x == x) && (s.y == y);
    })[0];
  }

  selectedSquare() {
    return this.squares.filter(function(s) {
      return (exists(s.piece) && s.piece.selected);
    })[0];
  }

  push(square) {
    this.squares.push(square);
  }

  length() {
    return this.squares.length;
  }

  map(callback) {
    return this.squares.map(callback);
  }

  include(square) {
    return exists(square) && this.squares.some(function(s) {
      return square.point().eq(s.point());
    });
  }

  difference(squareSet) {
    let _squares = this.squares.filter(function(a) {
      return squareSet.squares.filter(function(b) {
        return a.point().eq(b.point());
      }).length == 0
    });
    return new SquareSet({"squares": _squares});
  }

  first() {
    return this.squares[0];
  }

  last() {
    return this.squares.slice(-1)[0];
  }

  many() {
    return this.squares.length > 1;
  }

  any() {
    return (this.squares.length > 0);
  }

  empty() {
    return this.squares.length == 0;
  }

  filter(callback) {
    let _squares = this.squares.filter(callback);
    return new SquareSet({"squares": _squares});
  }

  allPossibleJumps(squares) {
    let _squares = this.squares.filter((s) => {
      return s.possibleJumps(s.piece, squares).any();
    });
    return new SquareSet({"squares": _squares});
  }

  occupiedByOpponentOf(playerNumber) {
    let squares = this.squares.filter(function(s) {
      return exists(s.piece) && (s.piece.playerNumber != playerNumber);
    });
    return new SquareSet({"squares": squares});
  }

  occupiedBy(playerNumber) {
    let squares = this.squares.filter(function(s) {
      return exists(s.piece) && (s.piece.playerNumber == playerNumber);
    });
    return new SquareSet({"squares": squares});
  }

  twoSquaresAwayFrom(from) {
    let squares = this.squares.filter(function(s) {
      let vector = new Vector(s, from);
      return vector.distance() == 2;
    });
    return new SquareSet({"squares": squares});
  }

  oneSquareAwayFrom(from) {
    let squares = this.squares.filter(function(s) {
      let vector = new Vector(s, from);
      return vector.distance() == 1;
    });
    return new SquareSet({"squares": squares});
  }

  inDirectionOf(piece, from) {
    let squares = this.squares.filter(function(s) {
      if (exists(piece)) {
        if (piece.king) {
          return true;
        } else {
          return (new Vector(from, s)).directionY() == piece.direction();
        }
      } else {
        return false;
      }
    });
    return new SquareSet({"squares": squares});
  }

  occupied() {
    let squares = this.squares.filter(function(s) {
      return s.occupied();
    });
    return new SquareSet({"squares": squares});
  }

  unoccupied() {
    let squares = this.squares.filter(function(s) {
      return s.unoccupied();
    });
    return new SquareSet({"squares": squares});
  }

  between(a, b) {
    let vector = new Vector(a, b);
    let squares = [];

    if (vector.diagonal()) {
      let pointCounter = a.point();
      let direction = vector.direction();
      squares = [];

      while (pointCounter.notEq(b.point())) {
        pointCounter = pointCounter.add(direction);
        let square = this.findSquare(pointCounter.x, pointCounter.y);

        if (exists(square) && square.point().notEq(b.point())) {
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
}

export default SquareSet;
