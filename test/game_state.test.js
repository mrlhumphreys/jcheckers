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

  describe('movePieces', () => {
    describe('with a move', () => {
      it('moves the piece', () => {
        let gameState = fixtures('selectedSquareGameState');
        let fromId = 12;
        let toId = 16;

        gameState.movePieces(fromId, toId);

        let from = gameState.findSquareById(fromId);
        let to = gameState.findSquareById(toId);

        expect(from.piece).toBe(null);
        expect(to.piece).not.toBe(null);
      });
    });

    describe('with a jump', () => {
      it('moves the piece', () => {
        let gameState = fixtures('jumpGameState');
        let fromId = 1;
        let toId = 10;

        gameState.movePieces(fromId, toId);

        let from = gameState.findSquareById(fromId);
        let to = gameState.findSquareById(toId);

        expect(from.piece).toBe(null);
        expect(to.piece).not.toBe(null);
      });

      it('removes the jumped over piece', () => {
        let gameState = fixtures('jumpGameState');
        let fromId = 1;
        let betweenId = 6;
        let toId = 10;

        gameState.movePieces(fromId, toId);

        let between = gameState.findSquareById(betweenId);

        expect(between.piece).toBe(null);
      });
    });

    describe('with a double jump', () => {
      it('moves the piece to the end', () => {
        let gameState = fixtures('doubleJumpGameState');
        let fromId = 1;
        let midToId = 10
        let lastToId = 19;
        let toIds = [midToId, lastToId];

        gameState.movePieces(fromId, toIds);

        let from = gameState.findSquareById(fromId);
        let lastTo = gameState.findSquareById(lastToId);

        expect(from.piece).toBe(null);
        expect(lastTo.piece).not.toBe(null);
      });

      it('removes all the jumped over pieces', () => {
        let gameState = fixtures('doubleJumpGameState');
        let fromId = 1;
        let firstBetweenId = 6;
        let midToId = 10
        let secondBetweenId = 15;
        let lastToId = 19;
        let toIds = [midToId, lastToId];

        gameState.movePieces(fromId, toIds);

        let firstBetween = gameState.findSquareById(firstBetweenId);
        let secondBetween = gameState.findSquareById(secondBetweenId);

        expect(firstBetween.piece).toBe(null);
        expect(secondBetween.piece).toBe(null);
      });
    });
  });
});
