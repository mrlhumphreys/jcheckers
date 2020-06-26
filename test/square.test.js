import Square from '../src/square'
import SquareSet from '../src/square_set'
import fixtures from './fixtures'

describe("Square", () => {
  describe("with a piece", () => {
    it("must have the same player as the piece", () => {
      let square = new Square({x: 1, y: 1, piece: { player_number: 1, king: false } });
      expect(square.player).toEqual(square.piece.player);
    });
  });

  describe("without a piece", () => {
    it("must have a null player", () => {
      let square = new Square({x: 1, y: 1, piece: null });
      expect(square.player).toBe(null);
    });
  });

  describe("Another piece must jump", () => {
    it("must not be selectable", () => {
      let squares = fixtures('mustJumpSquareSet');
      let square = squares.findByCoordinate(6, 5);
      expect(square.selectable(squares)).toBe(false);
    });
  });

  describe("No other piece must jump", () => {
    describe("piece has empty square forward", () => {
      it("must be selectable", () => {
        let squares = fixtures('noJumpSquareSet');
        let square = squares.findByCoordinate(6, 5);
        expect(square.selectable(squares)).toBe(true);
      });
    });

    describe("piece is blocked", () => {
      it("must not be selectable", () => {
        let squares = fixtures('noJumpSquareSet');
        let square = squares.findByCoordinate(6, 7);
        expect(square.selectable(squares)).toBe(false);
      });
    });

    describe("piece has jumpable enemy", () => {
      it("must be selectable", () => {
        let squares = fixtures('mustJumpSquareSet');
        let square = squares.findByCoordinate(2, 5);
        expect(square.selectable(squares)).toBe(true);
      });
    });
  });

  describe("a selected piece", () => {
    describe("attempting to move to an empty square nearby", () => {
      it("must be actionable", () => {
        let squares = fixtures('selectedNoJumpSquareSet');
        let square = squares.findByCoordinate(2, 5);
        let to = squares.findByCoordinate(3, 4);
        expect(square.actionable(square.piece, to, squares)).toBe(true);
      });
    });

    describe("attempting to jump an enemy piece", () => {
      it("must be actionable", () => {
        let squares = fixtures('selectedMustJumpSquareSet');
        let square = squares.findByCoordinate(2, 5);
        let to = squares.findByCoordinate(4, 3);
        expect(square.actionable(square.piece, to, squares)).toBe(true);
      });
    });

    describe("attempting to move too far", () => {
      it("must not be actionable", () => {
        let squares = fixtures('selectedNoJumpSquareSet');
        let square = squares.findByCoordinate(2, 5);
        let to = squares.findByCoordinate(4, 3);
        expect(square.actionable(square.piece, to, squares)).toBe(false);
      });
    });

    describe("attempting to move the wrong direction", () => {
      it("must not be actionable", () => {
        let squares = fixtures('selectedNoJumpSquareSet');
        let square = squares.findByCoordinate(2, 5);
        let to = squares.findByCoordinate(3, 6);
        expect(square.actionable(square.piece, to, squares)).toBe(false);
      });
    });

    describe("attempting to move to a blocked square", () => {
      it("must not be actionable", () => {
        let squares = fixtures('selectedNoJumpSquareSet');
        let square = squares.findByCoordinate(2, 5);
        let to = squares.findByCoordinate(1, 4);
        expect(square.actionable(square.piece, to, squares)).toBe(false);
      });
    });
  });

  describe("a square with empty squares beside it", () => {
    it("must have some possible moves", () => {
      let squares = fixtures('possibleMovesSquareSet');
      let square = squares.findByCoordinate(2, 5);
      expect(square.possibleMoves(square.piece, squares).some()).toBe(true);
    });
  });

  describe("a square with no empty squares beside it", () => {
    it("must not have any possible moves", () => {
      let squares = fixtures('noPossibleMovesSquareSet');
      let square = squares.findByCoordinate(2, 5);
      expect(square.possibleMoves(square.piece, squares).some()).toBe(false);
    });
  });

  describe("a selected square with enemy pieces nearby with empty squares behind them", () => {
    it("must have possible jumps", () => {
      let squares = fixtures('possibleJumpsSquareSet');
      let square = squares.findByCoordinate(2, 5);
      expect(square.possibleJumps(square.piece, squares).some()).toBe(true);
    });
  });

  describe("a selected square with enemy pieces nearby with blocked squares behind them", () => {
    it("must not have possible jumps", () => {
      let squares = fixtures('noPossibleJumpsSquareSet');
      let square = squares.findByCoordinate(2, 5);
      expect(square.possibleJumps(square.piece, squares).some()).toBe(false);
    });
  });

  describe("a selected square with no enemy pieces nearby", () => {
    it("must not have possible jumps", () => {
      let squares = fixtures('noPossibleJumpsSquareSet');
      let square = squares.findByCoordinate(7, 6);
      expect(square.possibleJumps(square.piece, squares).some()).toBe(false);
    });
  });

  describe("point", () => {
    it("must have coordinates equal to the square", () => {
      let square = new Square({x: 1, y: 1, piece: { player_number: 1, king: false } });
      expect(square.point().x).toEqual(1);
      expect(square.point().y).toEqual(1);
    });
  });

  describe('lastRankForPlayer', () => {
    describe('when player 1', () => {
      describe('and rank is 7', () => {
        let square = new Square({x: 0, y: 7, piece: null });
        let result = square.lastRankForPlayer(1); 
        expect(result).toBe(true);
      });

      describe('and rank is not 7', () => {
        let square = new Square({x: 1, y: 6, piece: null });
        let result = square.lastRankForPlayer(1); 
        expect(result).toBe(false);
      });
    });

    describe('when player 2', () => {
      describe('and rank is 0', () => {
        let square = new Square({x: 1, y: 0, piece: null });
        let result = square.lastRankForPlayer(2); 
        expect(result).toBe(true);
      });

      describe('and rank is not 0', () => {
        let square = new Square({x: 0, y: 1, piece: null });
        let result = square.lastRankForPlayer(2); 
        expect(result).toBe(false);
      });
    });
  });

  describe('mark', () => {
    it('must mark the square as selected', () => {
      let square = new Square({id: 1, x: 1, y: 1, piece: null, marked: false}); 
      let result = square.mark();
      expect(result).toBe(true);
      expect(square.marked).toBe(true);
    });
  });
  
  describe('unmark', () => {
    it('must unmark the square as selected', () => {
      let square = new Square({id: 1, x: 1, y: 1, piece: null, marked: true}); 
      let result = square.unmark();
      expect(result).toBe(true);
      expect(square.marked).toBe(false);
    });
  });

  describe('promote', () => {
    describe('with a piece', () => {
      it('promotes the piece', () => {
        let square = new Square({id: 1, x: 1, y: 1, piece: { id: 1, player_number: 1, king: false}}); 
        let result = square.promote();
        expect(result).toBe(true);
        expect(square.piece.king).toBe(true);
      });
    });

    describe('without a piece', () => {
      it('does not promote the piece', () => {
        let square = new Square({id: 1, x: 1, y: 1, piece: null }); 
        let result = square.promote();
        expect(result).toBe(false);
        expect(square.piece).toBe(null);
      });
    });
  });
});
