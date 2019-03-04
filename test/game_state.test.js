import fixtures from './fixtures'

describe('GameState', () => {
  describe('selectedSquare', () => {
    it('returns the selected square', () => {
      let gameState = fixtures('game_state');
      let square = gameState.squares.selectedSquare(); 
      expect(gameState.selectedSquare()).toEqual(square);
    });
  });

  describe('findSquareById', () => {
    it('returns the square with the matching id', () => {
      let gameState = fixtures('game_state');
      let square = gameState.squares.findSquareById(1);
      expect(gameState.findSquareById(1)).toEqual(square);
    });
  });  

  describe('playersTurn', () => {
    it('returns true if it is the players turn', () => {
      let gameState = fixtures('game_state');
      expect(gameState.playersTurn(1)).toBe(true);
    });

    it('returns false if it is not the players turn', () => {
      let gameState = fixtures('game_state');
      expect(gameState.playersTurn(2)).toBe(false);
    });
  });

  describe("movePossible", () => {
    it("returns true if the square is selectable", () => {
      let gameState = fixtures('game_state');
      let fromId = 12;      
      expect(gameState.movePossible(fromId)).toBe(true);
    });
  });

  describe("moveValid", () => {
    it("returns true if the piece can move", () => {
      let gameState = fixtures('game_state');
      expect(gameState.moveValid(12, [], 16)).toBe(true);
    });
  });

  describe("moveComplete", () => {
    it("returns the result of the move", () => {
      let gameState = fixtures('game_state');
      expect(gameState.moveComplete(12, [], 16)).toBe(true);
    });
  });

  describe('selectSquare', () => {
    describe('with a square that exists', () => {
      it('must mark the square as selected', () => {
        let gameState = fixtures('game_state');
        gameState.selectSquare(9);
        let square = gameState.findSquareById(9);
        expect(square.piece.selected).toBe(true);
      });
    });

    describe('with a square that does not exist', () => {
      it('must not do anything', () => {
        let gameState = fixtures('game_state');
        gameState.selectSquare(33);
        expect(gameState.selectedSquare()).toBe(undefined);
      });
    });
  });

  describe('deselectSquares', () => {
    it('must deselect all squares', () => {
      let gameState = fixtures('selectedSquareGameState');
      gameState.deselectSquares();
      expect(gameState.selectedSquare()).toBe(undefined);
    }); 
  });

  describe('markSquare', () => {
    describe('with a square that exists', () => {
      it('must mark the square', () => {
        let gameState = fixtures('game_state');
        gameState.markSquare(13);
        let square = gameState.findSquareById(13);
        expect(square.marked).toBe(true);
      });
    });

    describe('with a square that does not exist', () => {
      it('must not do anything', () => {
        let gameState = fixtures('game_state');
        gameState.markSquare(33);
        expect(gameState.squares.filter(function(s) { return s.marked; }).first()).toBe(undefined);
      });
    });

  });
});
