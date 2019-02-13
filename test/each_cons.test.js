import eachCons from '../src/each_cons'

describe('eachCons', () => {
  it('returns an array of grouped elements', () => {
    let array = [1, 2, 3, 4, 5];
    let result = eachCons(array, 2);
    let expected = [[1, 2], [2, 3], [3, 4], [4, 5]];
    expect(result).toEqual(expected);
  });
});
