import fixtures from './fixtures'

describe("Match", () => {
  describe("squares", () => {
    it("returns all squares", () => {
      let match = fixtures('match');
      let squares = match.gameState.squares;
      expect(match.squares()).toEqual(squares);
    });
  });

  describe("selectedSquare", () => {
    it("returns the square marked as selected", () => {
      let match = fixtures('match');
      let square = match.gameState.squares.selectedSquare(); 
      expect(match.selectedSquare()).toEqual(square);
    });
  });

  describe("findSquareById", () => {
    it("returns the square with the matching id", () => {
      let match = fixtures('match');
      let square = match.gameState.squares.findSquareById(1);
      expect(match.findSquareById(1)).toEqual(square);
    }); 
  });

  describe("playersTurn", () => {
    it("returns true if it's the player's turn", () => {
      let match = fixtures('match');
      expect(match.playersTurn(1)).toBe(true);
    });

    it("returns false if it's not the player's turn", () => {
      let match = fixtures('match');
      expect(match.playersTurn(2)).toBe(false);
    });
  });

  describe("playersName", () => {
    it("returns the name of the given player number", () => {
      let match = fixtures('match');
      expect(match.playersName(1)).toEqual('aaa');
    });
  }); 

  describe("currentPlayerName", () => {
    it("returns the name of the current player", () => {
      let match = fixtures('match');
      expect(match.currentPlayerName()).toEqual('aaa');
    });
  });

  describe("winnerName", () => {
    it("returns the name of the winner if there is one", () => {
      let match = fixtures('match', { winner: 1});
      expect(match.winnerName()).toBe('aaa');
    });

    it("returns the null if there is no winner", () => {
      let match = fixtures('match');
      expect(match.winnerName()).toBe(null);
    });
  });

  describe("movePossible", () => {
    it("returns the result from GameState", () => {
      let match = fixtures('match');
      let fromId = 12;      
      expect(match.movePossible(fromId)).toBe(true);
    });
  });

  describe("moveValid", () => {
    it("returns the result from GameState", () => {
      let match = fixtures('match');
      expect(match.moveValid(12, [], 16)).toBe(true);
    });
  });

  describe("moveComplete", () => {
    it("returns the result from gameState", () => {
      let match = fixtures('match');
      expect(match.moveComplete(12, [], 16)).toBe(true);
    });
  });

  describe('selectSquare', () => {
    it('must select the square', () => {
      let match = fixtures('match');
      match.selectSquare(9);
      let square = match.findSquareById(9);
      expect(square.piece.selected).toBe(true);
    });
  });

  describe('deselectSquares', () => {
    it('must deselect squares', () => {
      let match = fixtures('selectedSquareMatch');
      match.deselectSquares();
      expect(match.selectedSquare()).toBe(undefined);
    });
  });

  describe('markSquare', () => {
    it('must mark the square', () => {
      let match = fixtures('match');
      match.markSquare(13);
      let square = match.findSquareById(13);
      expect(square.marked).toBe(true);
    });
  });

  describe('addFromToCurrentMove', () => {
    it('must set currentMoveFromId', () => {
      let match = fixtures('match');
      match.addFromToCurrentMove(12);
      expect(match.currentMoveFromId).toEqual(12);
    });
  });

  describe('addToToCurrentMove', () => {
    it('must push to currentMoveToIds', () => {
      let match = fixtures('match');
      match.addToToCurrentMove(16);
      expect(match.currentMoveToIds).toEqual([16]); 
    });
  });

  describe('clearMove', () => {
    it('must set move attributes to null/empty', () => {
      let match = fixtures('match', {
        currentMoveFromId: 12,
        currentMoveToIds: [16]
      });
      match.clearMove();
      expect(match.currentMoveFromId).toBe(null);
      expect(match.currentMoveToIds).toEqual([]);
    });
  });
});
