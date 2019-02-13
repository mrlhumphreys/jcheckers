import Direction from './direction';

class Vector {
  constructor(pointA, pointB) {
    this.pointA = pointA;
    this.pointB = pointB;
  }

  dx() {
    return this.pointB.x - this.pointA.x;
  }

  dy() {
    return this.pointB.y - this.pointA.y;
  }

  absDx() {
    return Math.abs(this.dx());
  }

  absDy() {
    return Math.abs(this.dy());
  }

  diagonal() {
    return this.absDx() == this.absDy();
  }

  distance() {
    if (this.diagonal()) {
      return this.absDx();
    } else {
      return null;
    }
  }

  directionY() {
    if (this.dy() > 0) {
      return 1;
    } else if (this.dy() == 0) {
      return 0;
    } else {
      return -1;
    }
  }

  directionX() {
    if (this.dx() > 0) {
      return 1;
    } else if (this.dx() == 0) {
      return 0;
    } else {
      return -1;
    }
  }

  direction() {
    return new Direction(this.directionX(), this.directionY());
  }
}

export default Vector;