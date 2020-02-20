/**
 * Return an array of n elements from array starting at i 
 * @param {number[]} a - An array.
 * @param {number} i - Which element to start from.
 * @param {number} n - How many elements to return from i.
 * @return {number[]} - An array of numbers.
 */
const range = function(a, i, n) {
  return [...Array(n).keys()].map(function(j) { return a[i + j]; });
};

/**
 * Return an array of n length arrays 
 * each containing consective values from the original array.
 * @param {Array} a - An array.
 * @param {number} n - How long each array element is. 
 * @return {Array[]} - An array of n length arrays.
 */
const eachCons = function(a, n) {
  return [...Array(a.length - n + 1).keys()].map(function(i) { return range(a, i, n); });
};

export default eachCons;
