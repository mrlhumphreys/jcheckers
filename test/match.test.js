import fixtures from './fixtures'

describe("Match", () => {
  describe('initialize', () => {
    describe('with no winner', () => {
      it('sets the notification to a players turn message', () => {
        let match = fixtures('match');
        expect(match.notification).toEqual('aaa to move');
      });
    });

    describe('with winner', () => {
      it('sets the notification to winner message', () => {
        let match = fixtures('winningMatch');
        expect(match.notification).toEqual('bbb wins');
      });
    });
  });

  describe('asJson', () => {
    it('must return the match as json', () => {
      let match = fixtures('match');
      expect(match.asJson).toEqual({
        id: 1,
        game_state: { 
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
        },
        players: [
          { player_number: 1, name: 'aaa', resigned: false },
          { player_number: 2, name: 'bbb', resigned: false }
        ],
        current_move_from_id: null,
        current_move_to_ids: [],
        last_action: null,
        notification: 'aaa to move'
      });
    });
  });

  describe('winner', () => {
    describe('with someone winning on the board', () => {
      it('must return the player number of the winner', () => {
        let match = fixtures('winningMatch');
        expect(match.winner).toEqual(2);
      });
    });

    describe('with no one winning on the board', () => {
      it('must return null', () => {
        let match = fixtures('match');
        expect(match.winner).toBe(null);
      });
    });

    describe('with someone resigning', () => {
      it('must return the number of the player who did not resign', () => {
        let match = fixtures('resignedMatch');
        expect(match.winner).toEqual(2);
      });
    });
  });

  describe("findSquareById", () => {
    it("returns the square with the matching id", () => {
      let match = fixtures('match');
      let square = match.gameState.squares.findById(1);
      expect(match.gameState.findSquareById(1)).toEqual(square);
    }); 
  });

  describe('touchSquare', () => {
    describe('with a last action', () => {
      it('clears last action', () => {
        let match = fixtures('match', { last_action: { kind: 'misc', data: { a: 1 } } });
        match.touchSquare(1,1);
        expect(match.lastAction).toBe(null);
      });
    });

    describe('with a winner', () => {
      it('notifies with a message', () => {
        let match = fixtures('winningMatch');
        match.touchSquare(1, 1);
        expect(match.notification).toEqual("Game is over.");
      });
    });

    describe('not on the players turn', () => {
      it('notifies with a message', () => {
        let match = fixtures('match', { game_state: { current_player_number: 2 } });
        match.touchSquare(1, 1);
        expect(match.notification).toEqual("It is not your turn.");
      });
    });

    describe('with a square selected', () => {
      describe('and a valid move', () => {
        describe('and the move is complete', () => {
          it('moves pieces', () => {
            let match = fixtures('selectedSquareMatch');
            match.touchSquare(16, 1); 
            let fromSquare = match.gameState.findSquareById(12);
            let toSquare = match.gameState.findSquareById(16);
            expect(fromSquare.piece).toBe(null);
            expect(toSquare.piece).not.toBe(null);
          });

          it('passes the turn', () => {
            let match = fixtures('selectedSquareMatch');
            match.touchSquare(16, 1); 
            expect(match.gameState.currentPlayerNumber).toEqual(2);
          });

          it('unmark squares', () => {
            let match = fixtures('doubleJumpAlmostCompleteMatch');
            match.touchSquare(19, 1); 
            let square = match.gameState.squares.filter(function(s) { return s.marked; }).first();
            expect(square).toBe(undefined);
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

          it('updates the notification', () => {
            let match = fixtures('selectedSquareMatch');
            match.touchSquare(16, 1); 
            expect(match.notification).toEqual('bbb to move');
          });
        });

        describe('and the move is not complete', () => {
          it('marks the square', () => {
            let match = fixtures('doubleJumpMatch');
            match.touchSquare(10, 1);
            let square = match.gameState.findSquareById(10);
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
            expect(match.notification).toEqual('Piece can still jump.');
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
          let square = match.gameState.findSquareById(12);
          expect(square.piece.selected).toBe(false);
        });

        it('notifies with a message', () => {
          let match = fixtures('selectedSquareMatch');
          match.touchSquare(13, 1);
          expect(match.notification).toBe('Move is invalid.');
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
              let square = match.gameState.findSquareById(12);
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
              expect(match.notification).toEqual('That piece cannot move.');
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
            expect(match.notification).toBe('That piece is not yours.');
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
          expect(match.notification).toBe('That square is empty.');
        });
      });
    });
  });
});
