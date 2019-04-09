import Square from '../src/square'
import SquareSet from '../src/square_set'
import fixtures from './fixtures'

describe("Square", () => {
  describe('asJson', () => {
    it('must return the square as json', () => {
      let square = new Square({id: 1, x: 1, y: 1, piece: { player_number: 1 } });
      expect(square.asJson).toEqual({ 
        id: 1, 
        x: 1, 
        y: 1, 
        marked: false, 
        piece: { 
          player_number: 1, 
          king: false, 
          selected: false 
        } 
      });
    });

    it('must return null for the piece if piece is null', () => {
      let square = new Square({id: 1, x: 1, y: 1, piece: null });
      expect(square.asJson).toEqual({ 
        id: 1, 
        x: 1, 
        y: 1, 
        marked: false, 
        piece: null
      });
    });
  });

  describe('occupiedBy', () => {
    describe('when piece is owned by the player', () => {
      it('must return true', () => {
        let square = fixtures('square', { piece: { player_number: 1 }});
        expect(square.occupiedBy(1)).toBe(true);
      });
    });

    describe('when piece is not owned by the player', () => {
      it('must return false', () => {
        let square = fixtures('square', { piece: { player_number: 2 }});
        expect(square.occupiedBy(1)).toBe(false);
      });
    });
  });

  describe('occupiedByOpponentOf', () => {
    describe('when piece is owned by the player', () => {
      it('must return false', () => {
        let square = fixtures('square', { piece: { player_number: 1 }});
        expect(square.occupiedByOpponentOf(1)).toBe(false);
      });
    });

    describe('when piece is not owned by the player', () => {
      it('must return true', () => {
        let square = fixtures('square', { piece: { player_number: 2 }});
        expect(square.occupiedByOpponentOf(1)).toBe(true);
      });
    });
  });

  describe("with a piece", () => {
    it("must have the same player as the piece", () => {
      let square = new Square({x: 1, y: 1, piece: { player_number: 1, king: false } });
      expect(square.player).toEqual(square.piece.player);
    });

    it("must not be occupied", () => {
      let square = new Square({x: 1, y: 1, piece: { player_number: 1, king: false } });
      expect(square.unoccupied).toBe(false);
    });
  });

  describe("without a piece", () => {
    it("must have a null player", () => {
      let square = new Square({x: 1, y: 1, piece: null });
      expect(square.player).toBe(null);
    });

    it("must not be occupied", () => {
      let square = new Square({x: 1, y: 1, piece: null });
      expect(square.unoccupied).toBe(true);
    });
  });

  describe("Another piece must jump", () => {
    it("must not be selectable", () => {
      let squares = fixtures('mustJumpSquareSet');
      let square = squares.findSquare(6, 5);
      expect(square.selectable(squares)).toBe(false);
    });
  });

  describe("No other piece must jump", () => {
    describe("piece has empty square forward", () => {
      it("must be selectable", () => {
        let squares = fixtures('noJumpSquareSet');
        let square = squares.findSquare(6, 5);
        expect(square.selectable(squares)).toBe(true);
      });
    });

    describe("piece is blocked", () => {
      it("must not be selectable", () => {
        let squares = fixtures('noJumpSquareSet');
        let square = squares.findSquare(6, 7);
        expect(square.selectable(squares)).toBe(false);
      });
    });

    describe("piece has jumpable enemy", () => {
      it("must be selectable", () => {
        let squares = fixtures('mustJumpSquareSet');
        let square = squares.findSquare(2, 5);
        expect(square.selectable(squares)).toBe(true);
      });
    });
  });

  describe("a selected piece", () => {
    describe("attempting to move to an empty square nearby", () => {
      it("must be actionable", () => {
        let squares = fixtures('selectedNoJumpSquareSet');
        let square = squares.findSquare(2, 5);
        let to = squares.findSquare(3, 4);
        expect(square.actionable(square.piece, to, squares)).toBe(true);
      });
    });

    describe("attempting to jump an enemy piece", () => {
      it("must be actionable", () => {
        let squares = fixtures('selectedMustJumpSquareSet');
        let square = squares.findSquare(2, 5);
        let to = squares.findSquare(4, 3);
        expect(square.actionable(square.piece, to, squares)).toBe(true);
      });
    });

    describe("attempting to move too far", () => {
      it("must not be actionable", () => {
        let squares = fixtures('selectedNoJumpSquareSet');
        let square = squares.findSquare(2, 5);
        let to = squares.findSquare(4, 3);
        expect(square.actionable(square.piece, to, squares)).toBe(false);
      });
    });

    describe("attempting to move the wrong direction", () => {
      it("must not be actionable", () => {
        let squares = fixtures('selectedNoJumpSquareSet');
        let square = squares.findSquare(2, 5);
        let to = squares.findSquare(3, 6);
        expect(square.actionable(square.piece, to, squares)).toBe(false);
      });
    });

    describe("attempting to move to a blocked square", () => {
      it("must not be actionable", () => {
        let squares = fixtures('selectedNoJumpSquareSet');
        let square = squares.findSquare(2, 5);
        let to = squares.findSquare(1, 4);
        expect(square.actionable(square.piece, to, squares)).toBe(false);
      });
    });
  });

  describe("a square with empty squares beside it", () => {
    it("must have some possible moves", () => {
      let squares = fixtures('possibleMovesSquareSet');
      let square = squares.findSquare(2, 5);
      expect(square.possibleMoves(square.piece, squares).any).toBe(true);
    });
  });

  describe("a square with no empty squares beside it", () => {
    it("must not have any possible moves", () => {
      let squares = fixtures('noPossibleMovesSquareSet');
      let square = squares.findSquare(2, 5);
      expect(square.possibleMoves(square.piece, squares).any).toBe(false);
    });
  });

  describe("a selected square with enemy pieces nearby with empty squares behind them", () => {
    it("must have possible jumps", () => {
      let squares = fixtures('possibleJumpsSquareSet');
      let square = squares.findSquare(2, 5);
      expect(square.possibleJumps(square.piece, squares).any).toBe(true);
    });
  });

  describe("a selected square with enemy pieces nearby with blocked squares behind them", () => {
    it("must not have possible jumps", () => {
      let squares = fixtures('noPossibleJumpsSquareSet');
      let square = squares.findSquare(2, 5);
      expect(square.possibleJumps(square.piece, squares).any).toBe(false);
    });
  });

  describe("a selected square with no enemy pieces nearby", () => {
    it("must not have possible jumps", () => {
      let squares = fixtures('noPossibleJumpsSquareSet');
      let square = squares.findSquare(7, 6);
      expect(square.possibleJumps(square.piece, squares).any).toBe(false);
    });
  });

  describe("point", () => {
    it("must have coordinates equal to the square", () => {
      let square = new Square({x: 1, y: 1, piece: { player: { number: 1, direction: 1 }, king: false} });
      expect(square.point.x).toEqual(1);
      expect(square.point.y).toEqual(1);
    });
  });

  describe('select', () => {
    describe('with a piece', () => {
      it('must mark the piece as selected', () => {
        let square = new Square({id: 1, x: 1, y: 1, piece: { id: 1, player_number: 1, king: false, selected: false }}); 
        square.select();
        expect(square.piece.selected).toBe(true);
      });
    });

    describe('without a piece', () => {
      it('must not do anything', () => {
        let square = new Square({id: 1, x: 1, y: 1, piece: null}); 
        square.select();
        expect(square.piece).toBe(null);
      });
    }); 
  });

  describe('deselect', () => {
    describe('with a piece', () => {
      it('must mark the piece as not selected', () => {
        let square = new Square({id: 1, x: 1, y: 1, piece: { id: 1, player_number: 1, king: false, selected: true }}); 
        square.deselect();
        expect(square.piece.selected).toBe(false);
      });
    });

    describe('without a piece', () => {
      it('must not do anything', () => {
        let square = new Square({id: 1, x: 1, y: 1, piece: null}); 
        square.deselect();
        expect(square.piece).toBe(null);
      });
    });
  });

  describe('mark', () => {
    it('must mark the square as selected', () => {
      let square = new Square({id: 1, x: 1, y: 1, piece: null, marked: false}); 
      square.mark();
      expect(square.marked).toBe(true);
    });
  });
});
