import GameState from '../src/game_state'

const gameStateArgs = {
  current_player_number: 1,
  squares: [
    { id: 1, x: 1, y: 0, piece: { id: 1, player_number: 1, king: false }},
    { id: 2, x: 3, y: 0, piece: { id: 2, player_number: 1, king: false }},
    { id: 3, x: 5, y: 0, piece: { id: 3, player_number: 1, king: false }},
    { id: 4, x: 7, y: 0, piece: { id: 4, player_number: 1, king: false }},

    { id: 5, x: 0, y: 1, piece: { id: 5, player_number: 1, king: false }},
    { id: 6, x: 2, y: 1, piece: { id: 6, player_number: 1, king: false }},
    { id: 7, x: 4, y: 1, piece: { id: 7, player_number: 1, king: false }},
    { id: 8, x: 6, y: 1, piece: { id: 8, player_number: 1, king: false }},

    { id: 9, x: 1, y: 2, piece: { id: 9, player_number: 1, king: false }},
    { id: 10, x: 3, y: 2, piece: { id: 10, player_number: 1, king: false }},
    { id: 11, x: 5, y: 2, piece: { id: 11, player_number: 1, king: false }},
    { id: 12, x: 7, y: 2, piece: { id: 12, player_number: 1, king: false, selected: true }},

    { id: 13, x: 0, y: 3, piece: null },
    { id: 14, x: 2, y: 3, piece: null },
    { id: 15, x: 4, y: 3, piece: null },
    { id: 16, x: 6, y: 3, piece: null },

    { id: 17, x: 1, y: 4, piece: null },
    { id: 18, x: 3, y: 4, piece: null },
    { id: 19, x: 5, y: 4, piece: null },
    { id: 20, x: 7, y: 4, piece: null },

    { id: 21, x: 0, y: 5, piece: { id: 13, player_number: 2, king: false }},
    { id: 22, x: 2, y: 5, piece: { id: 14, player_number: 2, king: false }},
    { id: 23, x: 4, y: 5, piece: { id: 15, player_number: 2, king: false }},
    { id: 24, x: 6, y: 5, piece: { id: 16, player_number: 2, king: false }},

    { id: 25, x: 1, y: 6, piece: { id: 17, player_number: 2, king: false }},
    { id: 26, x: 3, y: 6, piece: { id: 18, player_number: 2, king: false }},
    { id: 27, x: 5, y: 6, piece: { id: 19, player_number: 2, king: false }},
    { id: 28, x: 7, y: 6, piece: { id: 20, player_number: 2, king: false }},

    { id: 29, x: 0, y: 7, piece: { id: 21, player_number: 2, king: false }},
    { id: 30, x: 2, y: 7, piece: { id: 22, player_number: 2, king: false }},
    { id: 31, x: 4, y: 7, piece: { id: 23, player_number: 2, king: false }},
    { id: 32, x: 6, y: 7, piece: { id: 24, player_number: 2, king: false }}
  ]
}

describe('GameState', () => {
  describe('selectedSquare', () => {
    it('returns the selected square', () => {
      let gameState = new GameState(gameStateArgs);
      let square = gameState.squares.selectedSquare(); 
      expect(gameState.selectedSquare()).toEqual(square);
    });
  });

  describe('findSquareById', () => {
    it('returns the square with the matching id', () => {
      let gameState = new GameState(gameStateArgs);
      let square = gameState.squares.findSquareById(1);
      expect(gameState.findSquareById(1)).toEqual(square);
    });
  });  

  describe('playersTurn', () => {
    it('returns true if it is the players turn', () => {
      let gameState = new GameState(gameStateArgs);
      expect(gameState.playersTurn(1)).toBe(true);
    });

    it('returns false if it is not the players turn', () => {
      let gameState = new GameState(gameStateArgs);
      expect(gameState.playersTurn(2)).toBe(false);
    });
  });

  describe("movePossible", () => {
    it("returns true if the square is selectable", () => {
      let gameState = new GameState(gameStateArgs);
      let fromId = 12;      
      expect(gameState.movePossible(fromId)).toBe(true);
    });

    it("returns false if the square is not selectable", () => {
      let gameState = new GameState(gameStateArgs);
      let fromId = 5;      
      expect(gameState.movePossible(fromId)).toBe(false);
    });
  });

  describe("moveValid", () => {
    it("returns true if the piece can move", () => {
      let gameState = new GameState(gameStateArgs);
      expect(gameState.moveValid(12, [], 16)).toBe(true);
    });

    it("returns false if the piece cannot move", () => {
      let gameState = new GameState(gameStateArgs);
      expect(gameState.moveValid(5, [], 9)).toBe(false);
    });
  });

  describe("moveComplete", () => {
    it("returns true if a move", () => {
      let gameState = new GameState(gameStateArgs);
      expect(gameState.moveComplete(12, [], 16)).toBe(true);
    });

    it("returns false if jump type and it can continue", () => {
      let squares = [
        { id: 1, x: 1, y: 0, piece: { id: 1, player_number: 1, king: false }},
        { id: 6, x: 2, y: 1, piece: { id: 13, player_number: 2, king: false }},
        { id: 10, x: 3, y: 2, piece: null},
        { id: 14, x: 2, y: 3, piece: { id: 14, player_number: 2, king: false }},
        { id: 17, x: 1, y: 4, piece: null}
      ];
      let args = Object.assign({}, gameStateArgs, {squares: squares});
      let gameState = new GameState(args);
      expect(gameState.moveComplete(1, [], 10)).toBe(false);
    });

    it("returns true if jump type and it cannot continue", () => {
      let squares = [
        { id: 1, x: 1, y: 0, piece: { id: 1, player_number: 1, king: false }},
        { id: 6, x: 2, y: 1, piece: { id: 13, player_number: 2, king: false }},
        { id: 10, x: 3, y: 2, piece: null},
        { id: 14, x: 2, y: 3, piece: { id: 14, player_number: 2, king: false }},
        { id: 17, x: 1, y: 4, piece: null}
      ];
      let args = Object.assign({}, gameStateArgs, {squares: squares});
      let gameState = new GameState(args);
      expect(gameState.moveComplete(1, [10], 17)).toBe(true);
    });
  });
});
