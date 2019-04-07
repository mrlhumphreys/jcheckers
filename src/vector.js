import Direction from './direction';

class Vector {
  constructor(pointA, pointB) {
    this.pointA = pointA;
    this.pointB = pointB;
  }

  get dx() {
    return this.pointB.x - this.pointA.x;
  }

  get dy() {
    return this.pointB.y - this.pointA.y;
  }

  get absDx() {
    return Math.abs(this.dx);
  }

  get absDy() {
    return Math.abs(this.dy);
  }

  get diagonal() {
    return this.absDx === this.absDy;
  }

  get distance() {
    if (this.diagonal) {
      return this.absDx;
    } else {
      return null;
    }
  }

  get directionY() {
    if (this.dy > 0) {
      return 1;
    } else if (this.dy === 0) {
      return 0;
    } else {
      return -1;
    }
  }

  get directionX() {
    if (this.dx > 0) {
      return 1;
    } else if (this.dx === 0) {
      return 0;
    } else {
      return -1;
    }
  }

  get direction() {
    return new Direction(this.directionX, this.directionY);
  }
}

export default Vector;
