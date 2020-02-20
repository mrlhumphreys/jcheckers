import { eachCons, exists } from './utils'
import SquareSet from './square_set'

/** The state of a checkers game **/
class GameState {
  /**
   * Create a GameState
   * @param {Object} args - The properties of the game state.
   * @param {number} args.current_player_number - The player who's turn it is.
   * @param {Object[]} args.squares - The squares of the board.
   */
  constructor(args) {
    /** @member {number} */
    this.currentPlayerNumber = args.current_player_number;
    /** @member {SquareSet} */
    this.squares = new SquareSet({"squares": args.squares});
  }

  /**
   * Serialize the game state as simple objects.
   * @return {Object} The serialized object.
   */
  get asJson() {
    return {
      current_player_number: this.currentPlayerNumber,
      squares: this.squares.asJson().squares 
    };
  }

  /**
   * Return the Square that has been selected.
   * @return {Square} The selected square.
   */
  get selectedSquare() {
    return this.squares.selected();
  }

  /**
   * Returns the winning player
   * @return {(number|null)} The winning player.
   */
  get winner() {
    if (this.squares.allMovesForPlayer(1).none()) {
      return 2;
    } else if (this.squares.allMovesForPlayer(2).none()) {
      return 1;
    } else {
      return null;
    }
  }

  /** 
   * Find the square matching the id
   * @param {number} id - The id of the square.
   * @return {Square} The matching square.
   */
  findSquareById(id) {
    return this.squares.findById(id);
  }

  /**
   * Returns true if the player's turn.
   * @param {number} playerNumber - The player's number.
   * @return {boolean} The result.
   */
  playersTurn(playerNumber) {
    return (this.currentPlayerNumber === playerNumber);
  }

  // actions

  /**
   * Marks the specified square as selected.
   * @param {number} squareId - The square's id.
   * @return {boolean} The result of the update.
   */
  selectSquare(squareId) {
    let square = this.findSquareById(squareId);
    if (exists(square)) {
      return square.select();
    } else {
      return false;
    }
  }

  /**
   * Marks all squares as not selected.
   * @return {boolean} The result of the update.
   */
  deselectSquares() {
    return this.squares.deselectSquares();
  }

  /**
   * Mark the square. Used for highlighting jumps.
   * @param {number} squareId - The square's id.
   * @return {boolean} The result of the update.
   */
  markSquare(squareId) {
    let square = this.findSquareById(squareId);
    if (exists(square)) {
      return square.mark();
    } else {
      return false;
    }
  }

  /**
   * Unmarks all squares.
   * @return {boolean} The result of the update.
   */
  unmarkSquares() {
    return this.squares.unmarkSquares();
  }

  /**
   * Perform the move as a player.
   * It moves the pieces, deselects squares, passes the turn and unmarks any squares.
   * @param {number} fromId - The id of the square the piece is currently on.
   * @param {number[]} toIds - The ids of the squares the piece will move to.
   * @return {boolean} The result of the move.
   */
  move(fromId, toIds) {
    return this.movePieces(fromId, toIds) && this.deselectSquares() && this.passTurn() && this.unmarkSquares();
  }

  /**
   * Move the pieces from the fromId to the toIds.
   * Perform any captures and promote any pieces reaching the last rank.
   * @param {number} fromId - The id of the square the piece is currently on.
   * @param {number[]} toIds - The ids of the squares the piece will move to.
   * @return {boolean} The result of the move.
   */
  movePieces(fromId, toIds) {
    let from = this.findSquareById(fromId);
    let tos = this.findSquareById(toIds);
    let piece = from.piece; 
    let legs = [];

    if (tos.constructorName === "SquareSet") {
      tos.last().piece = piece;
      legs = [from].concat(tos.squares);
    } else {
      tos.piece = piece;
      legs = [from].concat(tos);
    }

    from.piece = null;

    eachCons(legs,2).forEach((leg) => {
      let between = this.squares.between(leg[0], leg[1]).first(); 
      if (exists(between)) {
        between.piece = null;
      }
    });

    if (tos.constructorName === "SquareSet") {
      if (tos.last().lastRankForPlayer(this.currentPlayerNumber)) {
        tos.last().promote();
      }  
    } else {
      if (tos.lastRankForPlayer(this.currentPlayerNumber)) {
        tos.promote();
      }
    }
    return true;
  }

  /**
   * Passes the turn the other player.
   * currentPlayerNumber will update to the other player's number.
   * @return {boolean} The result of the update.
   */
  passTurn() {
    if (this.currentPlayerNumber == 1) {
      this.currentPlayerNumber = 2;
    } else {
      this.currentPlayerNumber = 1;
    }
    return true;
  }
};

export default GameState;
