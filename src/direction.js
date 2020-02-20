/** A direction on a 2d grid. **/
class Direction {
  /**
    * Create a Direction 
    * @param {number} x - The direction on the x axis.
    * @param {number} y - The direction on the y axis.
  */
  constructor(x, y) {
    /** @member {number} */
    this.x = x;
    /** @member {number} */
    this.y = y;
  }
};

export default Direction;
