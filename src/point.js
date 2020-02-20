//* A point on a grid */
class Point {
  /**
   * Create a Point
   * @param {number} x - The x co-ordinate.
   * @param {number} y - The y co-ordinate.
   */
  constructor(x, y) {
    //** @member {number} */
    this.x = x;
    //** @member {number} */
    this.y = y;
  }

  /**
   * Add two points together.
   * @param {Point} point - The point being added.
   * @return {Point} The resulting point.
   */
  add(point) {
    let newX = this.x + point.x;
    let newY = this.y + point.y;
    return new Point(newX, newY);
  }

  /**
   * Returns true if points have equal values
   * @param {Point} point - The point being compared.
   * @return {boolean} The result.
   */
  eq(point) {
    return (this.x === point.x) && (this.y === point.y);
  }

  /**
   * Returns false if points have equal values
   * @param {Point} point - The point being compared.
   * @return {boolean} The result.
   */
  notEq(point) {
    return !this.eq(point);
  }
}

export default Point;
