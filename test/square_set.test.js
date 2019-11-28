import SquareSet from '../src/square_set';
import Square from '../src/square';
import fixtures from './fixtures';

describe("SquareSet", () => {
  describe('constructor', () => {
    it('sets up all functions', () => {
      let squareSet = fixtures('squareSet');
      expect(squareSet.asJson.constructor).toBe(Function);
      expect(squareSet.findById.constructor).toBe(Function);
      expect(squareSet.findByCoordinate.constructor).toBe(Function);
      expect(squareSet.selected.constructor).toBe(Function);
      expect(squareSet.length.constructor).toBe(Function);
      expect(squareSet.map.constructor).toBe(Function);
      expect(squareSet.includes.constructor).toBe(Function);
      expect(squareSet.difference.constructor).toBe(Function);
      expect(squareSet.first.constructor).toBe(Function);
      expect(squareSet.last.constructor).toBe(Function);
      expect(squareSet.many.constructor).toBe(Function);
      expect(squareSet.some.constructor).toBe(Function);
      expect(squareSet.none.constructor).toBe(Function);
      expect(squareSet.filter.constructor).toBe(Function);
      expect(squareSet.occupiedByOpponentOf.constructor).toBe(Function);
      expect(squareSet.occupiedByPlayer.constructor).toBe(Function);
      expect(squareSet.occupied.constructor).toBe(Function);
      expect(squareSet.unoccupied.constructor).toBe(Function);
      expect(squareSet.squaresAwayFrom.constructor).toBe(Function);
      expect(squareSet.twoSquaresAwayFrom.constructor).toBe(Function);
      expect(squareSet.oneSquareAwayFrom.constructor).toBe(Function);
      expect(squareSet.between.constructor).toBe(Function);
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

  describe("inDirectionOf", () => {
    it("must return all squares in the piece's player's direction", () => {
      let squares = fixtures('withNeighboursSquareSet');
      let square = squares.findByCoordinate(3, 3);
      expect(squares.inDirectionOf(square.piece, square).some()).toBe(true);
    });
  });

  describe('deselectSquares', () => {
    it('must deselect all squares', () => {
      let squares = fixtures('withSelectedSquareSet');
      squares.deselectSquares();
      expect(squares.selected()).toBe(undefined);
    });
  });

  describe('unmarkSquares', () => {
    it('must unmark all squares', () => {
      let squares = fixtures('withMarkedSquareSet');
      squares.unmarkSquares();
      let square = squares.filter(function(s) { return s.marked; }).first();
      expect(square).toBe(undefined);
    });
  });
});
