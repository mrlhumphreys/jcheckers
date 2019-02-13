import Piece from '../src/piece'

describe('Piece', () => {
  describe('initialize', () => {
    describe('with king', () => {
      it('should set king to true', () => {
        let piece = new Piece({player_number: 1, king: true});
        expect(piece.king).toBe(true);
      });
    });  

    describe('without king', () => {
      it('should set king to false', () => {
        let piece = new Piece({player_number: 1});
        expect(piece.king).toBe(false);
      });
    });

    describe('with selected', () => {
      it('should set selected to true', () => {
        let piece = new Piece({player_number: 1, selected: true});
        expect(piece.selected).toBe(true);
      });
    });

    describe('without selected', () => {
      it('should set selected to false', () => {
        let piece = new Piece({player_number: 1});
        expect(piece.selected).toBe(false);
      });
    });
  });

  describe('direction', () => {
    describe('for player 1', () => {
      it('should be positive', () => {
        let piece = new Piece({player_number: 1});
        expect(piece.direction()).toEqual(1);
      });
    });

    describe('for player 2', () => {
      it('should be negative', () => {
        let piece = new Piece({player_number: 2});
        expect(piece.direction()).toEqual(-1);
      });
    });
  });
});
