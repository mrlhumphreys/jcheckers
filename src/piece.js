/** A piece on the board **/
class Piece {
  /**
   * Create a Piece
   * @param {Object} args - The properties of the piece. 
   * @param {number} args.id - The unique identifier of the piece.
   * @param {number} args.player_number - The owner of the piece.
   * @param {boolean} [args.king=false] - Is the piece a king?
   * @param {boolean} [args.selected=false] - Is the piece selected?
   */
  constructor(args) {
    /** @member {number} */
    this.id = args.id;
    /** @member {number} */
    this.playerNumber = args.player_number;
    /** @member {boolean} */
    this.king = args.king ? args.king : false;
    /** @member {boolean} */
    this.selected = args.selected ? args.selected : false;
  }

  /**
   * Serialize the game state as simple objects.
   * @return {Object} The serialized object.
   */
  get asJson() {
    return {
      id: this.id,
      player_number: this.playerNumber,
      king: this.king,
      selected: this.selected
    };
  }

  /**
   * Returns the direction that the piece goes
   * 1 for down, -1 for up.
   * @return {number} The direction.
   */
  get direction() {
    return (this.playerNumber === 1) ? 1 : -1;
  }

  // actions

  /**
   * Marks the piece as selected
   * @return {boolean} The result.
   */
  select() {
    this.selected = true;
    return true;
  }

  /**
   * Marks the piece as not selected
   * @return {boolean} The result.
   */
  deselect() {
    this.selected = false;
    return true;
  }

  /**
   * Promotes the piece to a king. 
   * @return {boolean} The result.
   */
  promote() {
    this.king = true;
    return true;
  }
}

export default Piece;
