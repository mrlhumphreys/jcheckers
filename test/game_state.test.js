import fixtures from './fixtures'

describe('GameState', () => {
  describe('asJson', () => {
    it('must return the game state as json', () => {
      let gameState = fixtures('gameState');
      expect(gameState.asJson()).toEqual({
        current_player_number: 1,
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

  describe('selectedSquare', () => {
    it('returns the selected square', () => {
      let gameState = fixtures('gameState');
      let square = gameState.squares.selectedSquare(); 
      expect(gameState.selectedSquare()).toEqual(square);
    });
  });

  describe('findSquareById', () => {
    it('returns the square with the matching id', () => {
      let gameState = fixtures('gameState');
      let square = gameState.squares.findSquareById(1);
      expect(gameState.findSquareById(1)).toEqual(square);
    });
  });  

  describe('playersTurn', () => {
    it('returns true if it is the players turn', () => {
      let gameState = fixtures('gameState');
      expect(gameState.playersTurn(1)).toBe(true);
    });

    it('returns false if it is not the players turn', () => {
      let gameState = fixtures('gameState');
      expect(gameState.playersTurn(2)).toBe(false);
    });
  });

  describe("movePossible", () => {
    it("returns true if the square is selectable", () => {
      let gameState = fixtures('gameState');
      let fromId = 12;      
      expect(gameState.movePossible(fromId)).toBe(true);
    });
  });

  describe("moveValid", () => {
    it("returns true if the piece can move", () => {
      let gameState = fixtures('gameState');
      expect(gameState.moveValid(12, [], 16)).toBe(true);
    });
  });

  describe("moveComplete", () => {
    it("returns the result of the move", () => {
      let gameState = fixtures('gameState');
      expect(gameState.moveComplete(12, [], 16)).toBe(true);
    });
  });

  describe('selectSquare', () => {
    describe('with a square that exists', () => {
      it('must mark the square as selected', () => {
        let gameState = fixtures('gameState');
        gameState.selectSquare(9);
        let square = gameState.findSquareById(9);
        expect(square.piece.selected).toBe(true);
      });
    });

    describe('with a square that does not exist', () => {
      it('must not do anything', () => {
        let gameState = fixtures('gameState');
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
        let gameState = fixtures('gameState');
        gameState.markSquare(13);
        let square = gameState.findSquareById(13);
        expect(square.marked).toBe(true);
      });
    });

    describe('with a square that does not exist', () => {
      it('must not do anything', () => {
        let gameState = fixtures('gameState');
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
