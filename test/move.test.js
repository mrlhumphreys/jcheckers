import Move from '../src/move'
import fixtures from './fixtures'

describe('Move', () => {
  describe('possible', () => { 
    it("returns true if the square is selectable", () => {
      let gameState = fixtures('game_state');
      let fromId = 12;      
      let move = new Move({fromId: fromId, gameState: gameState});
      expect(move.possible()).toBe(true);
      expect(move.error).toBe(null);
    });

    it("returns false if the square is not selectable", () => {
      let gameState = fixtures('game_state');
      let fromId = 5;      
      let move = new Move({fromId: fromId, gameState: gameState});
      expect(move.possible()).toBe(false);
      expect(move.error.name).toEqual('CannotMoveError');
    });
  }); 

  describe('valid', () => { 
    it("returns true if the piece can move", () => {
      let gameState = fixtures('game_state');
      let move = new Move({fromId: 12, toIds: [], proposedToId: 16, gameState: gameState});
      expect(move.valid()).toBe(true);
      expect(move.error).toBe(null);
    });

    it("returns false if the piece cannot move", () => {
      let gameState = fixtures('game_state');
      let move = new Move({fromId: 5, toIds: [], proposedToId: 9, gameState: gameState});
      expect(move.valid()).toBe(false);
      expect(move.error.name).toEqual('CannotMoveError');
    });
  }); 

  describe('complete', () => { 
    it("returns true if a move", () => {
      let gameState = fixtures('game_state');
      let move = new Move({fromId: 12, toIds: [], proposedToId: 16, gameState: gameState});
      expect(move.complete()).toBe(true);
    });

    it("returns false if jump type and it can continue", () => {
      let squares = [
        { id: 1, x: 1, y: 0, piece: { id: 1, player_number: 1, king: false }},
        { id: 6, x: 2, y: 1, piece: { id: 13, player_number: 2, king: false }},
        { id: 10, x: 3, y: 2, piece: null},
        { id: 14, x: 2, y: 3, piece: { id: 14, player_number: 2, king: false }},
        { id: 17, x: 1, y: 4, piece: null}
      ];
      let gameState = fixtures('game_state', {squares: squares});
      let move = new Move({fromId: 1, toIds: [], proposedToId: 10, gameState: gameState});
      expect(move.complete()).toBe(false);
    });

    it("returns true if jump type and it cannot continue", () => {
      let squares = [
        { id: 1, x: 1, y: 0, piece: { id: 1, player_number: 1, king: false }},
        { id: 6, x: 2, y: 1, piece: { id: 13, player_number: 2, king: false }},
        { id: 10, x: 3, y: 2, piece: null},
        { id: 14, x: 2, y: 3, piece: { id: 14, player_number: 2, king: false }},
        { id: 17, x: 1, y: 4, piece: null}
      ];
      let gameState = fixtures('game_state', { squares: squares });
      let move = new Move({fromId: 1, toIds: [10], proposedToId: 17, gameState: gameState});
      expect(move.complete()).toBe(true);
    });
  }); 
});
