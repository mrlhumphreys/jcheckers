import Square from '../src/square'
import SquareSet from '../src/square_set'

const mustJump = {
  "current_player_number":1,
  "squares": [
    {"x":1,"y":0,"piece":null},
    {"x":3,"y":0,"piece":null},
    {"x":5,"y":0,"piece":null},
    {"x":7,"y":0,"piece":null},

    {"x":0,"y":1,"piece":null},
    {"x":2,"y":1,"piece":null},
    {"x":4,"y":1,"piece":null},
    {"x":6,"y":1,"piece":null},

    {"x":1,"y":2,"piece":null},
    {"x":3,"y":2,"piece":null},
    {"x":5,"y":2,"piece":null},
    {"x":7,"y":2,"piece":null},

    {"x":0,"y":3,"piece":null},
    {"x":2,"y":3,"piece":null},
    {"x":4,"y":3,"piece":null},
    {"x":6,"y":3,"piece":null},

    {"x":1,"y":4,"piece":null},
    {"x":3,"y":4,"piece":{"player_number":1,"direction":1,"king":false}},
    {"x":5,"y":4,"piece":null},
    {"x":7,"y":4,"piece":null},

    {"x":0,"y":5,"piece":null},
    {"x":2,"y":5,"piece":{"player_number":2,"direction":-1,"king":false}},
    {"x":4,"y":5,"piece":null},
    {"x":6,"y":5,"piece":{"player_number":2,"direction":-1,"king":false}},

    {"x":1,"y":6,"piece":null},
    {"x":3,"y":6,"piece":null},
    {"x":5,"y":6,"piece":null},
    {"x":7,"y":6,"piece":null},

    {"x":0,"y":7,"piece":null},
    {"x":2,"y":7,"piece":null},
    {"x":4,"y":7,"piece":null},
    {"x":6,"y":7,"piece":null}
  ]
};

const noJump = {
  "current_player_number":1,
  "squares": [
    {"x":1,"y":0,"piece":null},
    {"x":3,"y":0,"piece":null},
    {"x":5,"y":0,"piece":null},
    {"x":7,"y":0,"piece":null},

    {"x":0,"y":1,"piece":null},
    {"x":2,"y":1,"piece":null},
    {"x":4,"y":1,"piece":null},
    {"x":6,"y":1,"piece":null},

    {"x":1,"y":2,"piece":null},
    {"x":3,"y":2,"piece":null},
    {"x":5,"y":2,"piece":null},
    {"x":7,"y":2,"piece":null},

    {"x":0,"y":3,"piece":null},
    {"x":2,"y":3,"piece":null},
    {"x":4,"y":3,"piece":null},
    {"x":6,"y":3,"piece":{"player_number":1,"direction":1,"king":false}},

    {"x":1,"y":4,"piece":null},
    {"x":3,"y":4,"piece":null},
    {"x":5,"y":4,"piece":null},
    {"x":7,"y":4,"piece":null},

    {"x":0,"y":5,"piece":null},
    {"x":2,"y":5,"piece":{"player_number":2,"direction":-1,"king":false}},
    {"x":4,"y":5,"piece":null},
    {"x":6,"y":5,"piece":{"player_number":2,"direction":-1,"king":false}},

    {"x":1,"y":6,"piece":null},
    {"x":3,"y":6,"piece":null},
    {"x":5,"y":6,"piece":{"player_number":2,"direction":-1,"king":false}},
    {"x":7,"y":6,"piece":{"player_number":2,"direction":-1,"king":false}},

    {"x":0,"y":7,"piece":null},
    {"x":2,"y":7,"piece":null},
    {"x":4,"y":7,"piece":null},
    {"x":6,"y":7,"piece":{"player_number":2,"direction":-1,"king":false}}
  ]
};

const selectedMustJump = {
  "current_player_number":1,
  "squares": [
    {"x":1,"y":0,"piece":null},
    {"x":3,"y":0,"piece":null},
    {"x":5,"y":0,"piece":null},
    {"x":7,"y":0,"piece":null},

    {"x":0,"y":1,"piece":null},
    {"x":2,"y":1,"piece":null},
    {"x":4,"y":1,"piece":null},
    {"x":6,"y":1,"piece":null},

    {"x":1,"y":2,"piece":null},
    {"x":3,"y":2,"piece":null},
    {"x":5,"y":2,"piece":null},
    {"x":7,"y":2,"piece":null},

    {"x":0,"y":3,"piece":null},
    {"x":2,"y":3,"piece":null},
    {"x":4,"y":3,"piece":null},
    {"x":6,"y":3,"piece":null},

    {"x":1,"y":4,"piece":null},
    {"x":3,"y":4,"piece":{"player_number":1,"direction":1,"king":false}},
    {"x":5,"y":4,"piece":null},
    {"x":7,"y":4,"piece":null},

    {"x":0,"y":5,"piece":null},
    {"x":2,"y":5,"piece":{"player_number":2,"direction":-1,"king":false}},
    {"x":4,"y":5,"piece":null},
    {"x":6,"y":5,"piece":null},

    {"x":1,"y":6,"piece":null},
    {"x":3,"y":6,"piece":null},
    {"x":5,"y":6,"piece":null},
    {"x":7,"y":6,"piece":null},

    {"x":0,"y":7,"piece":null},
    {"x":2,"y":7,"piece":null},
    {"x":4,"y":7,"piece":null},
    {"x":6,"y":7,"piece":null}
  ]
};

const selectedNoJump = {
  "current_player_number":1,
  "squares": [
    {"x":1,"y":0,"piece":null},
    {"x":3,"y":0,"piece":null},
    {"x":5,"y":0,"piece":null},
    {"x":7,"y":0,"piece":null},

    {"x":0,"y":1,"piece":null},
    {"x":2,"y":1,"piece":null},
    {"x":4,"y":1,"piece":null},
    {"x":6,"y":1,"piece":null},

    {"x":1,"y":2,"piece":null},
    {"x":3,"y":2,"piece":null},
    {"x":5,"y":2,"piece":null},
    {"x":7,"y":2,"piece":null},

    {"x":0,"y":3,"piece":null},
    {"x":2,"y":3,"piece":null},
    {"x":4,"y":3,"piece":null},
    {"x":6,"y":3,"piece":{"player_number":1,"direction":1,"king":false}},

    {"x":1,"y":4,"piece":{"player_number":2,"direction":-1,"king":false}},
    {"x":3,"y":4,"piece":null},
    {"x":5,"y":4,"piece":null},
    {"x":7,"y":4,"piece":null},

    {"x":0,"y":5,"piece":null},
    {"x":2,"y":5,"piece":{"player_number":2,"direction":-1,"king":false}},
    {"x":4,"y":5,"piece":null},
    {"x":6,"y":5,"piece":null},

    {"x":1,"y":6,"piece":null},
    {"x":3,"y":6,"piece":null},
    {"x":5,"y":6,"piece":null},
    {"x":7,"y":6,"piece":null},

    {"x":0,"y":7,"piece":null},
    {"x":2,"y":7,"piece":null},
    {"x":4,"y":7,"piece":null},
    {"x":6,"y":7,"piece":null}
  ]
};

const possibleJumps = {
  "current_player_number":1,
  "squares": [
    {"x":1,"y":0,"piece":null},
    {"x":3,"y":0,"piece":null},
    {"x":5,"y":0,"piece":null},
    {"x":7,"y":0,"piece":null},

    {"x":0,"y":1,"piece":null},
    {"x":2,"y":1,"piece":null},
    {"x":4,"y":1,"piece":null},
    {"x":6,"y":1,"piece":null},

    {"x":1,"y":2,"piece":null},
    {"x":3,"y":2,"piece":null},
    {"x":5,"y":2,"piece":null},
    {"x":7,"y":2,"piece":null},

    {"x":0,"y":3,"piece":null},
    {"x":2,"y":3,"piece":null},
    {"x":4,"y":3,"piece":null},
    {"x":6,"y":3,"piece":null},

    {"x":1,"y":4,"piece":null},
    {"x":3,"y":4,"piece":{"player_number":1,"direction":1,"king":false}},
    {"x":5,"y":4,"piece":null},
    {"x":7,"y":4,"piece":null},

    {"x":0,"y":5,"piece":null},
    {"x":2,"y":5,"piece":{"player_number":2,"direction":-1,"king":false}},
    {"x":4,"y":5,"piece":null},
    {"x":6,"y":5,"piece":null},

    {"x":1,"y":6,"piece":null},
    {"x":3,"y":6,"piece":null},
    {"x":5,"y":6,"piece":null},
    {"x":7,"y":6,"piece":null},

    {"x":0,"y":7,"piece":null},
    {"x":2,"y":7,"piece":null},
    {"x":4,"y":7,"piece":null},
    {"x":6,"y":7,"piece":null}
  ]
};

const possibleMoves = {
  "current_player_number":1,
  "squares": [
    {"x":1,"y":0,"piece":null},
    {"x":3,"y":0,"piece":null},
    {"x":5,"y":0,"piece":null},
    {"x":7,"y":0,"piece":null},

    {"x":0,"y":1,"piece":null},
    {"x":2,"y":1,"piece":null},
    {"x":4,"y":1,"piece":null},
    {"x":6,"y":1,"piece":null},

    {"x":1,"y":2,"piece":null},
    {"x":3,"y":2,"piece":null},
    {"x":5,"y":2,"piece":null},
    {"x":7,"y":2,"piece":null},

    {"x":0,"y":3,"piece":null},
    {"x":2,"y":3,"piece":null},
    {"x":4,"y":3,"piece":null},
    {"x":6,"y":3,"piece":{"player_number":1,"direction":1,"king":false}},

    {"x":1,"y":4,"piece":null},
    {"x":3,"y":4,"piece":null},
    {"x":5,"y":4,"piece":null},
    {"x":7,"y":4,"piece":null},

    {"x":0,"y":5,"piece":null},
    {"x":2,"y":5,"piece":{"player_number":2,"direction":-1,"king":false}},
    {"x":4,"y":5,"piece":null},
    {"x":6,"y":5,"piece":null},

    {"x":1,"y":6,"piece":null},
    {"x":3,"y":6,"piece":null},
    {"x":5,"y":6,"piece":null},
    {"x":7,"y":6,"piece":null},

    {"x":0,"y":7,"piece":null},
    {"x":2,"y":7,"piece":null},
    {"x":4,"y":7,"piece":null},
    {"x":6,"y":7,"piece":null}
  ]
};

const noPossibleMoves = {
  "current_player_number":1,
  "squares": [
    {"x":1,"y":0,"piece":null},
    {"x":3,"y":0,"piece":null},
    {"x":5,"y":0,"piece":null},
    {"x":7,"y":0,"piece":null},

    {"x":0,"y":1,"piece":null},
    {"x":2,"y":1,"piece":null},
    {"x":4,"y":1,"piece":null},
    {"x":6,"y":1,"piece":null},

    {"x":1,"y":2,"piece":null},
    {"x":3,"y":2,"piece":null},
    {"x":5,"y":2,"piece":null},
    {"x":7,"y":2,"piece":null},

    {"x":0,"y":3,"piece":{"player_number":1,"direction":1,"king":false}},
    {"x":2,"y":3,"piece":null},
    {"x":4,"y":3,"piece":{"player_number":1,"direction":1,"king":false}},
    {"x":6,"y":3,"piece":null},

    {"x":1,"y":4,"piece":{"player_number":1,"direction":1,"king":false}},
    {"x":3,"y":4,"piece":{"player_number":1,"direction":1,"king":false}},
    {"x":5,"y":4,"piece":null},
    {"x":7,"y":4,"piece":null},

    {"x":0,"y":5,"piece":null},
    {"x":2,"y":5,"piece":{"player_number":2,"direction":-1,"king":false}},
    {"x":4,"y":5,"piece":null},
    {"x":6,"y":5,"piece":{"player_number":2,"direction":-1,"king":false}},

    {"x":1,"y":6,"piece":null},
    {"x":3,"y":6,"piece":null},
    {"x":5,"y":6,"piece":null},
    {"x":7,"y":6,"piece":null},

    {"x":0,"y":7,"piece":null},
    {"x":2,"y":7,"piece":null},
    {"x":4,"y":7,"piece":null},
    {"x":6,"y":7,"piece":null}
  ]
};

const noPossibleJumps = {
  "current_player_number":1,
  "squares": [
    {"x":1,"y":0,"piece":null},
    {"x":3,"y":0,"piece":null},
    {"x":5,"y":0,"piece":null},
    {"x":7,"y":0,"piece":null},

    {"x":0,"y":1,"piece":null},
    {"x":2,"y":1,"piece":null},
    {"x":4,"y":1,"piece":null},
    {"x":6,"y":1,"piece":null},

    {"x":1,"y":2,"piece":null},
    {"x":3,"y":2,"piece":null},
    {"x":5,"y":2,"piece":null},
    {"x":7,"y":2,"piece":null},

    {"x":0,"y":3,"piece":null},
    {"x":2,"y":3,"piece":null},
    {"x":4,"y":3,"piece":null},
    {"x":6,"y":3,"piece":{"player_number":1,"direction":1,"king":false}},

    {"x":1,"y":4,"piece":{"player_number":2,"direction":-1,"king":false}},
    {"x":3,"y":4,"piece":{"player_number":2,"direction":-1,"king":false}},
    {"x":5,"y":4,"piece":null},
    {"x":7,"y":4,"piece":null},

    {"x":0,"y":5,"piece":null},
    {"x":2,"y":5,"piece":{"player_number":2,"direction":-1,"king":false}},
    {"x":4,"y":5,"piece":null},
    {"x":6,"y":5,"piece":null},

    {"x":1,"y":6,"piece":null},
    {"x":3,"y":6,"piece":null},
    {"x":5,"y":6,"piece":null},
    {"x":7,"y":6,"piece":{"player_number":2,"direction":-1,"king":false}},

    {"x":0,"y":7,"piece":null},
    {"x":2,"y":7,"piece":null},
    {"x":4,"y":7,"piece":null},
    {"x":6,"y":7,"piece":null}
  ]
};

describe("Square", () => {
  describe("with a piece", () => {
    it("must have the same player as the piece", () => {
      let square = new Square({x: 1, y: 1, piece: { player: { number: 1, direction: 1 }, king: false} });
      expect(square.player()).toEqual(square.piece.player);
    });

    it("must not be occupied", () => {
      let square = new Square({x: 1, y: 1, piece: { player: { number: 1, direction: 1 }, king: false} });
      expect(square.unoccupied()).toBe(false);
    });
  });

  describe("without a piece", () => {
    it("must have a null player", () => {
      let square = new Square({x: 1, y: 1, piece: null });
      expect(square.player()).toBe(null);
    });

    it("must not be occupied", () => {
      let square = new Square({x: 1, y: 1, piece: null });
      expect(square.unoccupied()).toBe(true);
    });
  });

  describe("Another piece must jump", () => {
    it("must not be selectable", () => {
      let squares = new SquareSet(mustJump);
      let square = squares.findSquare(6, 5);
      expect(square.selectable(squares)).toBe(false);
    });
  });

  describe("No other piece must jump", () => {
    describe("piece has empty square forward", () => {
      it("must be selectable", () => {
        let squares = new SquareSet(noJump);
        let square = squares.findSquare(6, 5);
        expect(square.selectable(squares)).toBe(true);
      });
    });

    describe("piece is blocked", () => {
      it("must not be selectable", () => {
        let squares = new SquareSet(noJump);
        let square = squares.findSquare(6, 7);
        expect(square.selectable(squares)).toBe(false);
      });
    });

    describe("piece has jumpable enemy", () => {
      it("must be selectable", () => {
        let squares = new SquareSet(mustJump);
        let square = squares.findSquare(2, 5);
        expect(square.selectable(squares)).toBe(true);
      });
    });
  });

  describe("a selected piece", () => {
    describe("attempting to move to an empty square nearby", () => {
      it("must be actionable", () => {
        let squares = new SquareSet(selectedNoJump);
        let square = squares.findSquare(2, 5);
        let to = squares.findSquare(3, 4);
        expect(square.actionable(square.piece, to, squares)).toBe(true);
      });
    });

    describe("attempting to jump an enemy piece", () => {
      it("must be actionable", () => {
        let squares = new SquareSet(selectedMustJump);
        let square = squares.findSquare(2, 5);
        let to = squares.findSquare(4, 3);
        expect(square.actionable(square.piece, to, squares)).toBe(true);
      });
    });

    describe("attempting to move too far", () => {
      it("must not be actionable", () => {
        let squares = new SquareSet(selectedNoJump);
        let square = squares.findSquare(2, 5);
        let to = squares.findSquare(4, 3);
        expect(square.actionable(square.piece, to, squares)).toBe(false);
      });
    });

    describe("attempting to move the wrong direction", () => {
      it("must not be actionable", () => {
        let squares = new SquareSet(selectedNoJump);
        let square = squares.findSquare(2, 5);
        let to = squares.findSquare(3, 6);
        expect(square.actionable(square.piece, to, squares)).toBe(false);
      });
    });

    describe("attempting to move to a blocked square", () => {
      it("must not be actionable", () => {
        let squares = new SquareSet(selectedNoJump);
        let square = squares.findSquare(2, 5);
        let to = squares.findSquare(1, 4);
        expect(square.actionable(square.piece, to, squares)).toBe(false);
      });
    });
  });

  describe("a square with empty squares beside it", () => {
    it("must have some possible moves", () => {
      let squares = new SquareSet(possibleMoves);
      let square = squares.findSquare(2, 5);
      expect(square.possibleMoves(square.piece, squares).any()).toBe(true);
    });
  });

  describe("a square with no empty squares beside it", () => {
    it("must not have any possible moves", () => {
      let squares = new SquareSet(noPossibleMoves);
      let square = squares.findSquare(2, 5);
      expect(square.possibleMoves(square.piece, squares).any()).toBe(false);
    });
  });

  describe("a selected square with enemy pieces nearby with empty squares behind them", () => {
    it("must have possible jumps", () => {
      let squares = new SquareSet(possibleJumps);
      let square = squares.findSquare(2, 5);
      expect(square.possibleJumps(square.piece, squares).any()).toBe(true);
    });
  });

  describe("a selected square with enemy pieces nearby with blocked squares behind them", () => {
    it("must not have possible jumps", () => {
      let squares = new SquareSet(noPossibleJumps);
      let square = squares.findSquare(2, 5);
      expect(square.possibleJumps(square.piece, squares).any()).toBe(false);
    });
  });

  describe("a selected square with no enemy pieces nearby", () => {
    it("must not have possible jumps", () => {
      let squares = new SquareSet(noPossibleJumps);
      let square = squares.findSquare(7, 6);
      expect(square.possibleJumps(square.piece, squares).any()).toBe(false);
    });
  });

  describe("point", () => {
    it("must have coordinates equal to the square", () => {
      let square = new Square({x: 1, y: 1, piece: { player: { number: 1, direction: 1 }, king: false} });
      expect(square.point().x).toEqual(1);
      expect(square.point().y).toEqual(1);
    });
  });
});