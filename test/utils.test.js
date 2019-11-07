import { exists, eachCons } from '../src/utils'

describe("exists", () => {
  describe("with null", () => {
    it("must return false", () => {
      let result = exists(null);
      expect(result).toBe(false);
    });
  });

  describe("with undefined", () => {
    it("must return false", () => {
      let result = exists(undefined);
      expect(result).toBe(false);
    });
  });

  describe("with object", () => {
    it("must return true", () => {
      let result = exists({});
      expect(result).toBe(true);
    });
  });

  describe("with array", () => {
    it("must return true", () => {
      let result = exists([]);
      expect(result).toBe(true);
    });
  });

  describe("with string", () => {
    it("must return true", () => {
      let result = exists("string");
      expect(result).toBe(true);
    });
  });

  describe("with number", () => {
    it("must return true", () => {
      let result = exists(1);
      expect(result).toBe(true);
    });
  });
});

describe('eachCons', () => {
  it('returns an array of grouped elements', () => {
    let array = [1, 2, 3, 4, 5];
    let result = eachCons(array, 2);
    let expected = [[1, 2], [2, 3], [3, 4], [4, 5]];
    expect(result).toEqual(expected);
  });
});
