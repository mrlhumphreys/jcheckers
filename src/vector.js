import Direction from './direction';

//** A Vector expressed by two points */
class Vector {
  /**
   * Create a Vector
   * @param {Point} pointA - The origin point of the vector.
   * @param {Point} pointB - The destination point of the vector.
   */
  constructor(pointA, pointB) {
    /** @member {Point} */
    this.pointA = pointA;

    /** @member {Point} */
    this.pointB = pointB;
  }

  /**
   * The difference between x co-ordinates.
   * @return {number}
   */
  get dx() {
    return this.pointB.x - this.pointA.x;
  }

  /**
   * The difference between y co-ordinates.
   * @return {number}
   */
  get dy() {
    return this.pointB.y - this.pointA.y;
  }

  /**
   * The absolute difference between x co-ordinates.
   * @return {number}
   */
  get absDx() {
    return Math.abs(this.dx);
  }

  /**
   * The absolute difference between y co-ordinates.
   * @return {number}
   */
  get absDy() {
    return Math.abs(this.dy);
  }

  /**
   * Is the vector diagonal?
   * @return {boolean}
   */
  get diagonal() {
    return this.absDx === this.absDy;
  }

  /**
   * The distance between points. 
   * Returns null if not diagonal.
   * @return {(number|null)}
   */
  get distance() {
    if (this.diagonal) {
      return this.absDx;
    } else {
      return null;
    }
  }

  /**
   * The direction of the component. 
   * 1 is down/right, -1 is up/left, 0 is neither..
   * @param {number} d - The component.
   * @return {number}
   */
  _directionD(d) {
    if (d > 0) {
      return 1;
    } else if (d === 0) {
      return 0;
    } else {
      return -1;
    }
  }

  /**
   * The direction of the y component of the vector. 
   * 1 is down, -1 is up, 0 is neither..
   * @return {number}
   */
  get directionY() {
    return this._directionD(this.dy);
  }

  /**
   * The direction of the x component of the vector. 
   * 1 is right, -1 is left, 0 is neither..
   * @return {number}
   */
  get directionX() {
    return this._directionD(this.dx);
  }

  /**
   * The direction of the vector. 
   * @return {Direction}
   */
  get direction() {
    return new Direction(this.directionX, this.directionY);
  }
}

export default Vector;
