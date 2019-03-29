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

  describe('notify', () => {
    it('must set the notification', () => {
      let match = fixtures('match');
      match.notify('hello');
      expect(match.lastAction.kind).toEqual('notification');
      expect(match.lastAction.data.message).toEqual('hello');
    });
  });

  describe('movePieces', () => {
    it('moves pieces in the gameState', () => {
      let match = fixtures('match');
      let fromId = 12;
      let toId = 16;

      match.movePieces(12, 16);

      let from = match.findSquareById(fromId);
      let to = match.findSquareById(toId);
      expect(from.piece).toBe(null);
      expect(to.piece).not.toBe(null);
    });
  });

  describe('addMoveToLastAction', () => {
    it('must add details of move to last action', () => {
      let match = fixtures('match');
      let fromId = 12;
      let toId = 16;

      match.addMoveToLastAction(fromId, [toId]);

      expect(match.lastAction.kind).toEqual('move');
      expect(match.lastAction.data.fromId).toEqual(fromId);
      expect(match.lastAction.data.toIds).toEqual([toId]);
    });
  });

  describe('touchSquare', () => {
    describe('with a winner', () => {
      it('notifies with a message', () => {
        let match = fixtures('match', { winner: 1 });
        match.touchSquare(1, 1);
        expect(match.lastAction.data.message).toEqual("Game is over.");
      });
    });

    describe('not on the players turn', () => {
      it('notifies with a message', () => {
        let match = fixtures('match', { game_state: { current_player_number: 2 } });
        match.touchSquare(1, 1);
        expect(match.lastAction.data.message).toEqual("It is not your turn.");
      });
    });

    describe('with a square selected', () => {
      describe('and a valid move', () => {
        describe('and the move is complete', () => {
          it('moves pieces', () => {
            let match = fixtures('selectedSquareMatch');
            match.touchSquare(16, 1); 
            let fromSquare = match.findSquareById(12);
            let toSquare = match.findSquareById(16);
            expect(fromSquare.piece).toBe(null);
            expect(toSquare.piece).not.toBe(null);
          });

          it('adds info to last_action', () => {
            let match = fixtures('selectedSquareMatch');
            match.touchSquare(16, 1); 
            expect(match.lastAction).toEqual({kind: 'move', data: { fromId: 12, toIds: [16]}});
          });

          it('clears move data', () => {
            let match = fixtures('selectedSquareMatch');
            match.touchSquare(16, 1); 
            expect(match.currentMoveFromId).toBe(null);
            expect(match.currentMoveToIds).toEqual([]);
          });
        });

        describe('and the move is not complete', () => {
          it('marks the square', () => {
            let match = fixtures('doubleJumpMatch');
            match.touchSquare(10, 1);
            let square = match.findSquareById(10);
            expect(square.marked).toBe(true);
          });

          it('add touched square id to move', () => {
            let match = fixtures('doubleJumpMatch');
            match.touchSquare(10, 1);
            expect(match.currentMoveToIds[0]).toEqual(10);
          });

          it('notifies with a message', () => {
            let match = fixtures('doubleJumpMatch');
            match.touchSquare(10, 1);
            expect(match.lastAction.data.message).toEqual('Piece can continue to jump.');
          });
        });
      });

      describe('and an invalid move', () => {
        it('clears the move', () => {
          let match = fixtures('selectedSquareMatch');
          match.touchSquare(13, 1);
          expect(match.currentMoveFromId).toBe(null);
        });

        it('deselects the piece', () => {
          let match = fixtures('selectedSquareMatch');
          match.touchSquare(13, 1);
          let square = match.findSquareById(12);
          expect(square.piece.selected).toBe(false);
        });

        it('notifies with a message', () => {
          let match = fixtures('selectedSquareMatch');
          match.touchSquare(13, 1);
          expect(match.lastAction.data.message).toBe('Move is not valid.');
        });
      });
    });

    describe('with no square selected', () => {
      describe('and the touched square has a piece', () => {
        describe('and the piece is owned by the player', () => {
          describe('and the move is possible', () => {
            it('selects the piece', () => {
              let match = fixtures('match'); 
              match.touchSquare(12, 1);
              let square = match.findSquareById(12);
              expect(square.piece.selected).toBe(true); 
            });

            it('adds the touched square to move', () => {
              let match = fixtures('match'); 
              match.touchSquare(12, 1);
              expect(match.currentMoveFromId).toEqual(12);
            });
          });

          describe('and the move is not possible', () => {
            it('clears the move', () => {
              let match = fixtures('match'); 
              match.touchSquare(8, 1);
              expect(match.currentMoveFromId).toBe(null);
            });

            it('notifies with a message', () => {
              let match = fixtures('match'); 
              match.touchSquare(8, 1);
              expect(match.lastAction.data.message).toEqual('That piece cannot move.');
            });
          });
        });

        describe('and the piece is not owned by the player', () => {
          it('clears the move', () => {
            let match = fixtures('match'); 
            match.touchSquare(32, 1);
            expect(match.currentMoveFromId).toBe(null);
          });

          it('notifies with a message', () => {
            let match = fixtures('match'); 
            match.touchSquare(32, 1);
            expect(match.lastAction.data.message).toBe('That piece is not yours.');
          });
        });
      });

      describe('and the touched square has no piece', () => {
        it('clears the move', () => {
          let match = fixtures('match');
          match.touchSquare(13, 1);
          expect(match.currentMoveFromId).toBe(null);
        });

        it('notifies with a message', () => {
          let match = fixtures('match');
          match.touchSquare(13, 1);
          expect(match.lastAction.data.message).toBe('That square is empty.');
        });
      });
    });
  });
});
