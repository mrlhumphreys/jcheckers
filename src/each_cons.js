const range = function(a, i, n) {
  return [...Array(n).keys()].map(function(j) { return a[i + j]; });
};

const eachCons = function(a, n) {
  return [...Array(a.length - n + 1).keys()].map(function(i) { return range(a, i, n); });
};

export default eachCons;
