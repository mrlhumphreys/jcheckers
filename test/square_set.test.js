import SquareSet from '../src/square_set';
import Square from '../src/square';
import fixtures from './fixtures';

describe("SquareSet", () => {
  describe("square in set", () => {
    it("must find square", () => {
      let squares = fixtures('withSquareSquareSet');
      let square = squares.findSquare(1, 1);
      expect(square).not.toBe(undefined);
    });

    it("must include square", () => {
      let squares = fixtures('withSquareSquareSet');
      let square = squares.findSquare(1, 1);
      expect(squares.include(square)).toBe(true);
    });
  });

  describe("square not in set", () => {
    it("must not find square", () => {
      let squares = fixtures('withSquareSquareSet');
      let square = squares.findSquare(2, 2);
      expect(square).toBe(undefined);
    });

    it("must include square", () => {
      let squares = fixtures('withSquareSquareSet');
      let square = squares.findSquare(2, 2);
      expect(squares.include(square)).toBe(false);
    });
  });

  describe("a set with some squares", () => {
    it("must have any", () => {
      let squares = fixtures('withSquareSquareSet');
      expect(squares.any()).toBe(true);
    });

    it("must not be empty", () => {
      let squares = fixtures('withSquareSquareSet');
      expect(squares.empty()).toBe(false);
    });
  });

  describe("a set with no squares", () => {
    it("must be empty", () => {
      let squares = fixtures('withNoSquareSquareSet');
      expect(squares.empty()).toBe(true);
    });

    it("must not have any", () => {
      let squares = fixtures('withNoSquareSquareSet');
      expect(squares.any()).toBe(false);
    });
  });

  describe("a set with a selected piece", () => {
    it("must be able to find the square", () => {
      let squares = fixtures('withSelectedSquareSet');
      expect(squares.selectedSquare()).not.toBe(undefined);
    });
  });

  describe("a set without a selected piece", () => {
    it("must must not be able to find the square", () => {
      let squares = fixtures('withoutSelectedSquareSet');
      expect(squares.selectedSquare()).toBe(undefined);
    });
  });

  describe("push", () => {
    it('must have more squares', () => {
      let squares = fixtures('withNoSquareSquareSet');
      let square = new Square({x: 7, y: 7});
      squares.push(square);
      expect(squares.squares.length).toBe(1);
    });
  });

  describe("length", () => {
    it('must return the length', () => {
      let squares = fixtures('withSquareSquareSet');
      expect(squares.length()).toBe(1);
    });
  });

  describe("map", () => {
    it('must call map using the passed callback', () => {
      let squares = fixtures('withSquareSquareSet');
      let result = squares.map(function(s) { return s.x; });
      expect(result).toEqual([1]);
    });
  });

  describe("filter", () => {
    it("must filter on the squares array with the callback", () => {
      let callback = function(s) { return s.x == 1; };
      let squares = fixtures('withSquareSquareSet');
      expect(squares.filter(callback)).not.toBe(null);
    });
  });

  describe("difference", () => {
    it('must not return squares excluded', () => {
      let squares = fixtures('withSquareSquareSet');
      let excluded = fixtures('withSquareSquareSet');
      expect(squares.difference(excluded).any()).toBe(false);
    });
  });

  describe("last", () => {
    it('must return the last element', () => {
      let squares = fixtures('withSquareSquareSet');
      let square = squares.findSquare(1,1);
      expect(squares.last().point().eq(square.point()));
    });
  });

  describe("allPossibleJumps", () => {
    it("must return all squares that can possibly jump", () => {
      let squares = fixtures('possibleJumpsSquareSet');
      expect(squares.allPossibleJumps(squares).any()).toBe(true);
    });
  });

  describe("occupiedByOpponentOf", () => {
    it("must return all squares occupied by the opponent of the player", () => {
      let playerNumber = 1;
      let squares = fixtures('withSquareSquareSet');
      expect(squares.occupiedByOpponentOf(playerNumber).any()).toBe(true);
    });
  });

  describe("twoSquaresAwayFrom", () => {
    it("must return all squares two squares away from the square", () => {
      let squares = fixtures('withNeighboursSquareSet');
      let square = squares.findSquare(1, 1);
      expect(squares.twoSquaresAwayFrom(square).any()).toBe(true);
    });
  });

  describe("oneSquareAwayFrom", () => {
    it("must return all squares one squares away from the square", () => {
      let squares = fixtures('withNeighboursSquareSet');
      let square = squares.findSquare(1, 1);
      expect(squares.oneSquareAwayFrom(square).any()).toBe(true);
    });
  });

  describe("inDirectionOf", () => {
    it("must return all squares in the piece's player's direction", () => {
      let squares = fixtures('withNeighboursSquareSet');
      let square = squares.findSquare(3, 3);
      expect(squares.inDirectionOf(square.piece, square).any()).toBe(true);
    });
  });

  describe("between", () => {
    it("must return all squares between the two squares", () => {
      let squares = fixtures('withNeighboursSquareSet');
      let from = squares.findSquare(3, 3);
      let to = squares.findSquare(1, 1);
      expect(squares.between(from, to).any()).toBe(true);
    });
  });

  describe("unoccupied", () => {
    it("must return all squares with no pieces", () => {
      let squares = fixtures('withEmptySquareSquareSet');
      expect(squares.unoccupied().any()).toBe(true);
    });
  });

  describe('deselectSquares', () => {
    it('must deselect all squares', () => {
      let squares = fixtures('withSelectedSquareSet');
      squares.deselectSquares();
      expect(squares.selectedSquare()).toBe(undefined);
    });
  });
});
