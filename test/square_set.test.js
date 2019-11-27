import SquareSet from '../src/square_set';
import Square from '../src/square';
import fixtures from './fixtures';

describe("SquareSet", () => {
  describe('asJson', () => {
    it('must return the square set as json', () => {
      let squareSet = fixtures('squareSet');
      expect(squareSet.asJson).toEqual({
        squares: [
          { id: 1, x: 1, y: 0, marked: false, piece: { id: 1, player_number: 1, king: false, selected: false }},
          { id: 2, x: 3, y: 0, marked: false, piece: { id: 2, player_number: 1, king: false, selected: false }},
          { id: 3, x: 5, y: 0, marked: false, piece: { id: 3, player_number: 1, king: false, selected: false }},
          { id: 4, x: 7, y: 0, marked: false, piece: { id: 4, player_number: 1, king: false, selected: false }},

          { id: 5, x: 0, y: 1, marked: false, piece: { id: 5, player_number: 1, king: false, selected: false }},
          { id: 6, x: 2, y: 1, marked: false, piece: { id: 6, player_number: 1, king: false, selected: false }},
          { id: 7, x: 4, y: 1, marked: false, piece: { id: 7, player_number: 1, king: false, selected: false }},
          { id: 8, x: 6, y: 1, marked: false, piece: { id: 8, player_number: 1, king: false, selected: false }},

          { id: 9, x: 1, y: 2, marked: false, piece: { id: 9, player_number: 1, king: false, selected: false }},
          { id: 10, x: 3, y: 2, marked: false, piece: { id: 10, player_number: 1, king: false, selected: false }},
          { id: 11, x: 5, y: 2, marked: false, piece: { id: 11, player_number: 1, king: false, selected: false }},
          { id: 12, x: 7, y: 2, marked: false, piece: { id: 12, player_number: 1, king: false, selected: false }},

          { id: 13, x: 0, y: 3, marked: false, piece: null },
          { id: 14, x: 2, y: 3, marked: false, piece: null },
          { id: 15, x: 4, y: 3, marked: false, piece: null },
          { id: 16, x: 6, y: 3, marked: false, piece: null },

          { id: 17, x: 1, y: 4, marked: false, piece: null },
          { id: 18, x: 3, y: 4, marked: false, piece: null },
          { id: 19, x: 5, y: 4, marked: false, piece: null },
          { id: 20, x: 7, y: 4, marked: false, piece: null },

          { id: 21, x: 0, y: 5, marked: false, piece: { id: 13, player_number: 2, king: false, selected: false }},
          { id: 22, x: 2, y: 5, marked: false, piece: { id: 14, player_number: 2, king: false, selected: false }},
          { id: 23, x: 4, y: 5, marked: false, piece: { id: 15, player_number: 2, king: false, selected: false }},
          { id: 24, x: 6, y: 5, marked: false, piece: { id: 16, player_number: 2, king: false, selected: false }},

          { id: 25, x: 1, y: 6, marked: false, piece: { id: 17, player_number: 2, king: false, selected: false }},
          { id: 26, x: 3, y: 6, marked: false, piece: { id: 18, player_number: 2, king: false, selected: false }},
          { id: 27, x: 5, y: 6, marked: false, piece: { id: 19, player_number: 2, king: false, selected: false }},
          { id: 28, x: 7, y: 6, marked: false, piece: { id: 20, player_number: 2, king: false, selected: false }},

          { id: 29, x: 0, y: 7, marked: false, piece: { id: 21, player_number: 2, king: false, selected: false }},
          { id: 30, x: 2, y: 7, marked: false, piece: { id: 22, player_number: 2, king: false, selected: false }},
          { id: 31, x: 4, y: 7, marked: false, piece: { id: 23, player_number: 2, king: false, selected: false }},
          { id: 32, x: 6, y: 7, marked: false, piece: { id: 24, player_number: 2, king: false, selected: false }}
        ]
      });
    });
  });

  describe('findSquareById', () => {
    describe('when square with matching id is in set', () => {
      it('must return the square', () => {
        let squares = fixtures('squareSet');
        let square = squares.findSquareById(1);
        expect(square).toBeInstanceOf(Square);
        expect(square.id).toEqual(1);
      });
    });

    describe('when squares with matching array of ids are in set', () => {
      it('must return the squares', () => {
        let squares = fixtures('squareSet');
        let foundSquares = squares.findSquareById([1,2]);
        expect(foundSquares).toBeInstanceOf(SquareSet);
        expect(foundSquares.first.id).toEqual(1);
        expect(foundSquares.last.id).toEqual(2);
      });
    });

    describe('when square is not in set', () => {
      it('must return undefined', () => {
        let squares = fixtures('squareSet');
        let square = squares.findSquareById(0);
        expect(square).toBe(undefined);
      });
    });

    describe('when squares are not in set', () => {
      it('must return empty', () => {
        let squares = fixtures('squareSet');
        let foundSquares = squares.findSquareById([0,-1]);
        expect(foundSquares).toBeInstanceOf(SquareSet);
        expect(foundSquares.length).toEqual(0);
      });
    });

    describe('when id is invalid', () => {
      it('must return undefined', () => {
        let squares = fixtures('squareSet');
        let square = squares.findSquareById(undefined);
        expect(square).toBe(undefined); 
      });
    });
  });

  describe("square in set", () => {
    it("must find square", () => {
      let squares = fixtures('withSquareSquareSet');
      let square = squares.findSquare(1, 1);
      expect(square).not.toBe(undefined);
    });

    it("must include square", () => {
      let squares = fixtures('withSquareSquareSet');
      let square = squares.findSquare(1, 1);
      expect(squares.includes(square)).toBe(true);
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
      expect(squares.includes(square)).toBe(false);
    });
  });

  describe("a set with some squares", () => {
    it("must have any", () => {
      let squares = fixtures('withSquareSquareSet');
      expect(squares.some()).toBe(true);
    });

    it("must not be empty", () => {
      let squares = fixtures('withSquareSquareSet');
      expect(squares.none()).toBe(false);
    });
  });

  describe("a set with no squares", () => {
    it("must be empty", () => {
      let squares = fixtures('withNoSquareSquareSet');
      expect(squares.none()).toBe(true);
    });

    it("must not have any", () => {
      let squares = fixtures('withNoSquareSquareSet');
      expect(squares.some()).toBe(false);
    });
  });

  describe("a set with a selected piece", () => {
    it("must be able to find the square", () => {
      let squares = fixtures('withSelectedSquareSet');
      expect(squares.selectedSquare).not.toBe(undefined);
    });
  });

  describe("a set without a selected piece", () => {
    it("must must not be able to find the square", () => {
      let squares = fixtures('withoutSelectedSquareSet');
      expect(squares.selectedSquare).toBe(undefined);
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
      expect(squares.length).toBe(1);
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
      expect(squares.difference(excluded).some()).toBe(false);
    });
  });

  describe("last", () => {
    it('must return the last element', () => {
      let squares = fixtures('withSquareSquareSet');
      let square = squares.findSquare(1,1);
      expect(squares.last.point.eq(square.point));
    });
  });

  describe('allMovesForPlayer', () => {
    describe('with jumps', () => {
      it('must return all jumps for the specified player', () => {
        let squares = fixtures('possibleJumpsSquareSet');
        expect(squares.allMovesForPlayer(1).some()).toBe(true);
      });
    });

    describe('with no jumps', () => {
      it('must return all moves for the specified player', () => {
        let squares = fixtures('possibleMovesSquareSet');
        expect(squares.allMovesForPlayer(1).some()).toBe(true);
      });
    });
  });

  describe('allPossibleMoves', () => {
    it('must return all squares that can possibly move', () => {
      let squares = fixtures('possibleMovesSquareSet');
      expect(squares.allPossibleMoves(squares).some()).toBe(true);
    });
  });

  describe("allPossibleJumps", () => {
    it("must return all squares that can possibly jump", () => {
      let squares = fixtures('possibleJumpsSquareSet');
      expect(squares.allPossibleJumps(squares).some()).toBe(true);
    });
  });

  describe("occupiedByOpponentOf", () => {
    it("must return all squares occupied by the opponent of the player", () => {
      let playerNumber = 1;
      let squares = fixtures('withSquareSquareSet');
      expect(squares.occupiedByOpponentOf(playerNumber).some()).toBe(true);
    });
  });

  describe("squaresAwayFrom", () => {
    it("must return all squares number of squares away from the square", () => {
      let squares = fixtures('withNeighboursSquareSet');
      let square = squares.findSquare(1, 1);
      let number = 2;
      expect(squares.squaresAwayFrom(2, square).some()).toBe(true);
    });
  });

  describe("twoSquaresAwayFrom", () => {
    it("must return all squares two squares away from the square", () => {
      let squares = fixtures('withNeighboursSquareSet');
      let square = squares.findSquare(1, 1);
      expect(squares.twoSquaresAwayFrom(square).some()).toBe(true);
    });
  });

  describe("oneSquareAwayFrom", () => {
    it("must return all squares one squares away from the square", () => {
      let squares = fixtures('withNeighboursSquareSet');
      let square = squares.findSquare(1, 1);
      expect(squares.oneSquareAwayFrom(square).some()).toBe(true);
    });
  });

  describe("inDirectionOf", () => {
    it("must return all squares in the piece's player's direction", () => {
      let squares = fixtures('withNeighboursSquareSet');
      let square = squares.findSquare(3, 3);
      expect(squares.inDirectionOf(square.piece, square).some()).toBe(true);
    });
  });

  describe("between", () => {
    it("must return all squares between the two squares", () => {
      let squares = fixtures('withNeighboursSquareSet');
      let from = squares.findSquare(3, 3);
      let to = squares.findSquare(1, 1);
      expect(squares.between(from, to).some()).toBe(true);
    });
  });

  describe("unoccupied", () => {
    it("must return all squares with no pieces", () => {
      let squares = fixtures('withEmptySquareSquareSet');
      expect(squares.unoccupied.some()).toBe(true);
    });
  });

  describe('deselectSquares', () => {
    it('must deselect all squares', () => {
      let squares = fixtures('withSelectedSquareSet');
      squares.deselectSquares();
      expect(squares.selectedSquare).toBe(undefined);
    });
  });

  describe('unmarkSquares', () => {
    it('must unmark all squares', () => {
      let squares = fixtures('withMarkedSquareSet');
      squares.unmarkSquares();
      let square = squares.filter(function(s) { return s.marked; }).first;
      expect(square).toBe(undefined);
    });
  });
});
