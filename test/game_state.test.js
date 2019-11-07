import fixtures from './fixtures'

describe('GameState', () => {
  describe('asJson', () => {
    it('must return the game state as json', () => {
      let gameState = fixtures('gameState');
      expect(gameState.asJson).toEqual({
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
      let square = gameState.squares.selectedSquare; 
      expect(gameState.selectedSquare).toEqual(square);
    });
  });

  describe('winner', () => {
    describe('when player 1 has no moves', () => {
      it('must return 2', () => {
        let gameState = fixtures('noMovesPlayerOneGameState');
        expect(gameState.winner).toEqual(2);
      });
    });

    describe('when player 2 has no moves', () => {
      it('must return 1', () => {
        let gameState = fixtures('noMovesPlayerTwoGameState');
        expect(gameState.winner).toEqual(1);
      });
    });

    describe('when both players have moves', () => {
      it('must return null', () => {
        let gameState = fixtures('gameState');
        expect(gameState.winner).toBe(null);
      });
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
        expect(gameState.selectedSquare).toBe(undefined);
      });
    });
  });

  describe('deselectSquares', () => {
    it('must deselect all squares', () => {
      let gameState = fixtures('selectedSquareGameState');
      gameState.deselectSquares();
      expect(gameState.selectedSquare).toBe(undefined);
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
        expect(gameState.squares.filter(function(s) { return s.marked; }).first).toBe(undefined);
      });
    });
  });

  describe('unmarkSquares', () => {
    it('must unmark all squares', () => {
      let gameState = fixtures('markedSquareGameState');
      gameState.unmarkSquares();
      let square = gameState.squares.filter(function(s) { return s.marked; }).first;
      expect(square).toBe(undefined);
    }); 
  });

  describe('move', () => {
    it('moves the piece', () => {
      let gameState = fixtures('doubleJumpAlmostCompleteGameState'); 
      gameState.move(1, [10, 19]);
      let from = gameState.squares.findSquareById(1);
      let to = gameState.squares.findSquareById(19);

      expect(from.piece).toBe(null);
      expect(to.piece.id).toEqual(1);
    });

    it('deselects the square', () => {
      let gameState = fixtures('doubleJumpAlmostCompleteGameState'); 
      gameState.move(1, [10, 19]);
      let to = gameState.squares.findSquareById(19);

      expect(to.piece.selected).toBe(false);
    });
    
    it('passes the turn', () => {
      let gameState = fixtures('doubleJumpAlmostCompleteGameState'); 
      gameState.move(1, [10, 19]);

      expect(gameState.currentPlayerNumber).toEqual(2);
    });

    it('unmarks the square', () => {
      let gameState = fixtures('doubleJumpAlmostCompleteGameState'); 
      gameState.move(1, [10, 19]);
      let between = gameState.squares.findSquareById(10);

      expect(between.marked).toBe(false);
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

    describe('with a move to the last rank', () => {
      it('promotes the piece', () => {
        let gameState = fixtures('moveToLastRankGameState');
        let fromId = 25;
        let toId = 29; 

        gameState.movePieces(fromId, toId);

        let to = gameState.findSquareById(toId);

        expect(to.piece.king).toBe(true);
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

  describe('passTurn', () => {
    describe('when current turn is player 1', () => {
      it('passes the turn to player 2', () => {
        let gameState = fixtures('gameState', { current_player_number: 1 });
        gameState.passTurn(); 
        expect(gameState.currentPlayerNumber).toEqual(2);
      });
    });

    describe('when current turn is player 2', () => {
      it('passes the turn to player 1', () => {
        let gameState = fixtures('gameState', { current_player_number: 2 });
        gameState.passTurn(); 
        expect(gameState.currentPlayerNumber).toEqual(1);
      });
    });
  });
});
