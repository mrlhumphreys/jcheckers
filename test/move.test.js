import Move from '../src/move'
import fixtures from './fixtures'

describe('Move', () => {
  describe('validate', () => {
    describe('winning match', () => {
      it('must return game is over result', () => {
        let match = fixtures('winningMatch');
        let move = new Move({
          match: match
        });
        expect(move.result.name).toEqual('GameOver');
        expect(move.result.message).toEqual('Game is over.');
      });
    });

    describe('not players turn', () => {
      it('must return a not players turn result', () => {
        let match = fixtures('match');
        let move = new Move({
          match: match,
          touchedSquareId: 12,
          playerNumber: 2
        });
        expect(move.result.name).toEqual('NotPlayersTurn');
        expect(move.result.message).toEqual('It is not your turn.');
      });
    });

    describe('piece can move', () => {
      it('must return a move possible result', () => {
        let match = fixtures('match');
        let move = new Move({
          match: match,
          touchedSquareId: 12,
          playerNumber: 1  
        });
        expect(move.result.name).toEqual('MovePossible');
        expect(move.result.message).toEqual('');
      });
    });

    describe('piece cannot move', () => {
      it('must return a move impossible result', () => {
        let match = fixtures('match');
        let move = new Move({
          match: match,
          touchedSquareId: 5,
          playerNumber: 1 
        });
        expect(move.result.name).toEqual('MoveImpossible');
        expect(move.result.message).toEqual('That piece cannot move.');
      });
    });

    describe('piece is not owned by player', () => {
      it('must return a not players piece error', () => {
        let match = fixtures('match');
        let move = new Move({
          match: match,
          touchedSquareId: 21,
          playerNumber: 1 
        });
        expect(move.result.name).toEqual('NotPlayersPiece');
        expect(move.result.message).toEqual('That piece is not yours.');
      }); 
    });

    describe('square is empty', () => {
      it('must return a square is empty error', () => {
        let match = fixtures('match');
        let move = new Move({
          match: match,
          touchedSquareId: 13,
          playerNumber: 1 
        });
        expect(move.result.name).toEqual('EmptySquare');
        expect(move.result.message).toEqual('That square is empty.');
      });
    });

    describe('move is move type and complete', () => {
      it('must return a move compelte result', () => {
        let match = fixtures('selectedSquareMatch');
        let move = new Move({
          match: match,
          touchedSquareId: 16,
          playerNumber: 1 
        });

        expect(move.result.name).toEqual('MoveComplete');
        expect(move.result.message).toEqual('');
      });
    });

    describe('move is jump type and complete', () => {
      it('must return a move compelte result', () => {
        let match = fixtures('doubleJumpAlmostCompleteMatch');
        let move = new Move({
          match: match,
          touchedSquareId: 19,
          playerNumber: 1 
        });

        expect(move.result.name).toEqual('MoveComplete');
        expect(move.result.message).toEqual('');
      });
    });

    describe('move is jump type and not complete', () => {
      it('must return a move compelte result', () => {
        let match = fixtures('doubleJumpMatch');
        let move = new Move({
          match: match,
          touchedSquareId: 10,
          playerNumber: 1 
        });

        expect(move.result.name).toEqual('MoveIncomplete');
        expect(move.result.message).toEqual('Piece can still jump.');
      });
    });

    describe('move is invalid', () => {
      it('must return a move invalid result', () => {
        let match = fixtures('selectedSquareMatch');
        let move = new Move({
          match: match,
          touchedSquareId: 19,
          playerNumber: 1 
        });

        expect(move.result.name).toEqual('MoveInvalid');
        expect(move.result.message).toEqual('Move is invalid.');
      });
    });
  });
});
