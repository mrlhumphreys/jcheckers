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
});
