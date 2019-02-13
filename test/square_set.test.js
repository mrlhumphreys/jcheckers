import SquareSet from '../src/square_set';
import Square from '../src/square';

const setWithSquare = {
  "squares": [
    {"x":1,"y":1,"piece":{"player_number":2,"direction":-1,"king":false}}
  ]
};

const setWithNoSquares = { "squares": [] };

const setWithSelected = {
  "squares": [
    {"x":1,"y":1,"piece":{"player_number":2,"direction":-1,"king":false, "selected":true}}
  ]
};

const setWithoutSelected = {
  "squares": [
    {"x":1,"y":1,"piece":{"player_number":2,"direction":-1,"king":false, "selected":false}}
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

const setWithNeighbours = {
  "squares": [
    {"x":1,"y":1,"piece":{"player_number":2,"direction":-1,"king":false}},
    {"x":2,"y":2,"piece":{"player_number":2,"direction":-1,"king":false}},
    {"x":3,"y":3,"piece":{"player_number":2,"direction":-1,"king":false}}
  ]
};

const setWithEmpty = {
  "squares": [
    {"x":1,"y":1,"piece": null}
  ]
};

describe("SquareSet", () => {
  describe("square in set", () => {
    it("must find square", () => {
      let squares = new SquareSet(setWithSquare);
      let square = squares.findSquare(1, 1);
      expect(square).not.toBe(undefined);
    });

    it("must include square", () => {
      let squares = new SquareSet(setWithSquare);
      let square = squares.findSquare(1, 1);
      expect(squares.include(square)).toBe(true);
    });
  });

  describe("square not in set", () => {
    it("must not find square", () => {
      let squares = new SquareSet(setWithSquare);
      let square = squares.findSquare(2, 2);
      expect(square).toBe(undefined);
    });

    it("must include square", () => {
      let squares = new SquareSet(setWithSquare);
      let square = squares.findSquare(2, 2);
      expect(squares.include(square)).toBe(false);
    });
  });

  describe("a set with some squares", () => {
    it("must have any", () => {
      let squares = new SquareSet(setWithSquare);
      expect(squares.any()).toBe(true);
    });

    it("must not be empty", () => {
      let squares = new SquareSet(setWithSquare);
      expect(squares.empty()).toBe(false);
    });
  });

  describe("a set with no squares", () => {
    it("must be empty", () => {
      let squares = new SquareSet(setWithNoSquares);
      expect(squares.empty()).toBe(true);
    });

    it("must not have any", () => {
      let squares = new SquareSet(setWithNoSquares);
      expect(squares.any()).toBe(false);
    });
  });

  describe("a set with a selected piece", () => {
    it("must be able to find the square", () => {
      let squares = new SquareSet(setWithSelected);
      expect(squares.selectedSquare()).not.toBe(undefined);
    });
  });

  describe("a set without a selected piece", () => {
    it("must must not be able to find the square", () => {
      let squares = new SquareSet(setWithoutSelected);
      expect(squares.selectedSquare()).toBe(undefined);
    });
  });

  describe("push", () => {
    it('must have more squares', () => {
      let squares = new SquareSet(setWithNoSquares);
      let square = new Square({x: 7, y: 7});
      squares.push(square);
      expect(squares.squares.length).toBe(1);
    });
  });

  describe("length", () => {
    it('must return the length', () => {
      let squares = new SquareSet(setWithSquare);
      expect(squares.length()).toBe(1);
    });
  });

  describe("map", () => {
    it('must call map using the passed callback', () => {
      let squares = new SquareSet(setWithSquare);
      let result = squares.map(function(s) { return s.x; });
      expect(result).toEqual([1]);
    });
  });

  describe("filter", () => {
    it("must filter on the squares array with the callback", () => {
      let callback = function(s) { return s.x == 1; };
      let squares = new SquareSet(setWithSquare);
      expect(squares.filter(callback)).not.toBe(null);
    });
  });

  describe("difference", () => {
    it('must not return squares excluded', () => {
      let squares = new SquareSet(setWithSquare);
      let excluded = new SquareSet(setWithSquare);
      expect(squares.difference(excluded).any()).toBe(false);
    });
  });

  describe("last", () => {
    it('must return the last element', () => {
      let squares = new SquareSet(setWithSquare);
      let square = squares.findSquare(1,1);
      expect(squares.last().point().eq(square.point()));
    });
  });

  describe("allPossibleJumps", () => {
    it("must return all squares that can possibly jump", () => {
      let squares = new SquareSet(possibleJumps);
      expect(squares.allPossibleJumps(squares).any()).toBe(true);
    });
  });

  describe("occupiedByOpponentOf", () => {
    it("must return all squares occupied by the opponent of the player", () => {
      let playerNumber = 1;
      let squares = new SquareSet(setWithSquare);
      expect(squares.occupiedByOpponentOf(playerNumber).any()).toBe(true);
    });
  });

  describe("twoSquaresAwayFrom", () => {
    it("must return all squares two squares away from the square", () => {
      let squares = new SquareSet(setWithNeighbours);
      let square = squares.findSquare(1, 1);
      expect(squares.twoSquaresAwayFrom(square).any()).toBe(true);
    });
  });

  describe("oneSquareAwayFrom", () => {
    it("must return all squares one squares away from the square", () => {
      let squares = new SquareSet(setWithNeighbours);
      let square = squares.findSquare(1, 1);
      expect(squares.oneSquareAwayFrom(square).any()).toBe(true);
    });
  });

  describe("inDirectionOf", () => {
    it("must return all squares in the piece's player's direction", () => {
      let squares = new SquareSet(setWithNeighbours);
      let square = squares.findSquare(3, 3);
      expect(squares.inDirectionOf(square.piece, square).any()).toBe(true);
    });
  });

  describe("between", () => {
    it("must return all squares between the two squares", () => {
      let squares = new SquareSet(setWithNeighbours);
      let from = squares.findSquare(3, 3);
      let to = squares.findSquare(1, 1);
      expect(squares.between(from, to).any()).toBe(true);
    });
  });

  describe("unoccupied", () => {
    it("must return all squares with no pieces", () => {
      let squares = new SquareSet(setWithEmpty);
      expect(squares.unoccupied().any()).toBe(true);
    });
  });
});
